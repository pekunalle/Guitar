import { useEffect, useRef, useState } from "react";
import { detectPitch, type Detection } from "@/lib/music/pitch";

export function usePitch(active: boolean, onStable?: (heard: Detection) => void) {
  const [heard, setHeard] = useState<Detection | null>(null);
  const [error, setError] = useState<string | null>(null);
  const onStableRef = useRef(onStable);
  const waveRef = useRef<Float32Array | null>(null);
  onStableRef.current = onStable;

  useEffect(() => {
    if (!active) {
      setHeard(null);
      return;
    }
    let dead = false;
    let raf = 0;
    let audioCtx: AudioContext | null = null;
    const streamRef: { current: MediaStream | null } = { current: null };
    const tracker = { pc: -1, held: 0, fired: false, silent: 0 };
    let lastUi = 0;

    const stopTracks = () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    };

    void (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
        });
        if (dead) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }
        streamRef.current = stream;
        audioCtx = new AudioContext();
        const source = audioCtx.createMediaStreamSource(stream);
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 2048;
        source.connect(analyser);
        const buf = new Float32Array(analyser.fftSize);
        const loop = () => {
          if (dead || !audioCtx) return;
          analyser.getFloatTimeDomainData(buf);
          if (!waveRef.current || waveRef.current.length !== buf.length) waveRef.current = new Float32Array(buf.length);
          waveRef.current.set(buf);
          const det = detectPitch(buf, audioCtx.sampleRate);
          const now = performance.now();
          if (!det) {
            tracker.silent += 1;
            if (tracker.silent > 12) {
              tracker.pc = -1;
              tracker.held = 0;
              tracker.fired = false;
            }
            if (tracker.silent === 4) setHeard(null);
          } else {
            tracker.silent = 0;
            if (now - lastUi > 80) {
              lastUi = now;
              setHeard(det);
            }
            if (Math.abs(det.cents) <= 35) {
              if (det.pc !== tracker.pc) {
                tracker.pc = det.pc;
                tracker.held = 1;
                tracker.fired = false;
              } else {
                tracker.held += 1;
              }
              if (!tracker.fired && tracker.held >= 9) {
                tracker.fired = true;
                onStableRef.current?.(det);
              }
            }
          }
          raf = requestAnimationFrame(loop);
        };
        setError(null);
        raf = requestAnimationFrame(loop);
      } catch (err) {
        if (dead) return;
        const name = err instanceof DOMException ? err.name : "";
        setError(name === "NotAllowedError" || name === "SecurityError" ? "denied" : name === "NotFoundError" ? "missing" : "failed");
      }
    })();

    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      stopTracks();
      void audioCtx?.close();
      waveRef.current = null;
    };
  }, [active]);

  return {
    heard,
    error,
    getWave: () => waveRef.current,
  };
}
