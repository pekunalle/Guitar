import { midiToFreq } from "./theory";

let ctx: AudioContext | null = null;
let metroGen = 0;

export function getAudio(): AudioContext {
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

export function pluck(midi: number): void {
  const c = getAudio();
  const freq = midiToFreq(midi);
  const sr = c.sampleRate;
  const dur = 1.15;
  const len = Math.floor(sr * dur);
  const buffer = c.createBuffer(1, len, sr);
  const data = buffer.getChannelData(0);
  const period = Math.max(2, Math.round(sr / freq));
  for (let i = 0; i < period; i++) data[i] = (Math.random() * 2 - 1) * 0.55;
  for (let i = period; i < len; i++) {
    const a = data[i - period];
    const b = data[i - period + 1] ?? a;
    data[i] = (a + b) * 0.498 * 0.996;
  }
  const src = c.createBufferSource();
  src.buffer = buffer;
  const filter = c.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = Math.min(2800, freq * 8);
  const gain = c.createGain();
  gain.gain.value = 0.42;
  src.connect(filter);
  filter.connect(gain);
  gain.connect(c.destination);
  src.start();
}

function scheduleClick(c: AudioContext, when: number, accent: boolean): void {
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = "square";
  o.frequency.setValueAtTime(accent ? 1680 : 1080, when);
  g.gain.setValueAtTime(accent ? 0.16 : 0.07, when);
  g.gain.exponentialRampToValueAtTime(0.001, when + 0.045);
  o.connect(g);
  g.connect(c.destination);
  o.start(when);
  o.stop(when + 0.05);
}

export function startMetronome(bpm: number, beats: number, onVisual: (beat: number) => void): () => void {
  const c = getAudio();
  const id = ++metroGen;
  let next = c.currentTime + 0.08;
  let beat = 0;
  let timer = 0;
  const loop = () => {
    if (id !== metroGen) return;
    const horizon = c.currentTime + 0.28;
    while (next < horizon) {
      const accent = beat % beats === 0;
      scheduleClick(c, next, accent);
      const delay = Math.max(0, (next - c.currentTime) * 1000);
      const shown = beat % beats;
      window.setTimeout(() => {
        if (id === metroGen) onVisual(shown);
      }, delay);
      next += 60 / bpm;
      beat += 1;
    }
    timer = window.setTimeout(loop, 50);
  };
  loop();
  return () => {
    metroGen += 1;
    window.clearTimeout(timer);
  };
}
