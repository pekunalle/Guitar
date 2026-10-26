import { freqToMidi, pcOf } from "./theory";

export type Detection = {
  midi: number;
  pc: number;
  cents: number;
  freq: number;
  rms: number;
};

function rmsOf(buf: Float32Array): number {
  let sum = 0;
  for (let i = 0; i < buf.length; i++) sum += buf[i] * buf[i];
  return Math.sqrt(sum / buf.length);
}

function parabolic(corr: Float32Array, lag: number): number {
  const y1 = corr[lag - 1] ?? corr[lag];
  const y2 = corr[lag];
  const y3 = corr[lag + 1] ?? corr[lag];
  const denom = y1 - 2 * y2 + y3;
  if (Math.abs(denom) < 1e-8) return lag;
  return lag + (y1 - y3) / (2 * denom);
}

/** Autocorrelation pitch detector. Returns null when the signal is too quiet or unclear. */
export function detectPitch(input: Float32Array, sampleRate: number): Detection | null {
  const rms = rmsOf(input);
  if (rms < 0.012) return null;

  const factor = 2;
  const length = Math.floor(input.length / factor);
  if (length < 64) return null;
  const buf = new Float32Array(length);
  for (let i = 0; i < length; i++) {
    buf[i] = (input[i * factor] + input[i * factor + 1]) * 0.5;
  }
  const rate = sampleRate / factor;
  const minF = 55;
  const maxF = 1040;
  const minLag = Math.max(2, Math.floor(rate / maxF));
  const maxLag = Math.min(length - 3, Math.floor(rate / minF));
  if (maxLag <= minLag + 2) return null;

  const corr = new Float32Array(maxLag + 2);
  for (let lag = minLag; lag <= maxLag; lag++) {
    let sum = 0;
    let energy = 0;
    const step = 2;
    for (let i = 0; i < length - lag; i += step) {
      const a = buf[i];
      sum += a * buf[i + lag];
      energy += a * a;
    }
    corr[lag] = energy > 1e-8 ? sum / energy : 0;
  }

  let peakLag = -1;
  let peak = 0;
  for (let lag = minLag + 1; lag < maxLag; lag++) {
    const c = corr[lag];
    if (c > peak) peak = c;
    if (c >= 0.42 && c >= corr[lag - 1] && c >= corr[lag + 1] && c > corr[lag - 1] + 0.002) {
      peakLag = lag;
      peak = c;
      break;
    }
  }
  if (peakLag < 0 || peak < 0.42) return null;

  const refined = parabolic(corr, peakLag);
  const freq = rate / refined;
  if (!Number.isFinite(freq) || freq < minF || freq > maxF) return null;
  const exact = freqToMidi(freq);
  const midi = Math.round(exact);
  const cents = Math.max(-99, Math.min(99, Math.round((exact - midi) * 100)));
  return { midi, pc: pcOf(midi), cents, freq, rms };
}
