import { useEffect, useRef } from "react";

export function Waveform({ getWave }: { getWave: () => Float32Array | null }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const getRef = useRef(getWave);
  getRef.current = getWave;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      const node = ref.current;
      if (!node) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = node.clientWidth;
      const h = node.clientHeight;
      if (w < 2 || h < 2) return;
      const pw = Math.floor(w * dpr);
      const ph = Math.floor(h * dpr);
      if (node.width !== pw || node.height !== ph) {
        node.width = pw;
        node.height = ph;
      }
      const css = getComputedStyle(document.documentElement);
      const live = css.getPropertyValue("--color-primary").trim() || "#e23b24";
      const idle = css.getPropertyValue("--color-muted").trim() || "#b3a394";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const data = getRef.current();
      ctx.beginPath();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = data ? live : idle;
      if (!data) {
        ctx.moveTo(0, h / 2);
        ctx.lineTo(w, h / 2);
      } else {
        const step = Math.max(1, Math.floor(data.length / w));
        for (let x = 0; x < w; x++) {
          const v = data[Math.min(data.length - 1, x * step)] ?? 0;
          const y = h / 2 - Math.max(-1, Math.min(1, v)) * (h * 0.46);
          if (x === 0) ctx.moveTo(0, y);
          else ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={ref} className="wave" aria-hidden="true" />;
}
