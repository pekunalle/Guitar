import type { Detection } from "@/lib/music/pitch";
import { noteName, noteWithOctave } from "@/lib/music/theory";

export function PitchReadout({ heard, finnish, idle }: { heard: Detection | null; finnish: boolean; idle: string }) {
  const cents = heard ? Math.max(-50, Math.min(50, heard.cents)) : 0;
  return (
    <div className="panel">
      <p className="kicker">Kuultu nuotti</p>
      <p className="readout-note">{heard ? noteName(heard.pc, finnish) : "–"}</p>
      <p className="text-sm text-muted tabular-nums">{heard ? noteWithOctave(heard.midi, finnish) : idle}</p>
      <div className="cents-track mt-3" aria-hidden="true">
        <span className="cents-mid" />
        {heard ? <span className="cents-needle" style={{ left: `${50 + cents}%` }} /> : null}
      </div>
      <p className="mt-2 text-sm tabular-nums text-muted">
        {heard ? `${heard.cents > 0 ? "+" : ""}${heard.cents} senttiä` : "Keskilinja on puhdas vire"}
      </p>
    </div>
  );
}

export function micErrorText(error: string | null): string | null {
  if (error === "denied") return "Mikrofoni estetty. Salli se selaimen kysyessä tai sivuston asetuksista.";
  if (error === "missing") return "Mikrofonia ei löytynyt.";
  if (error === "failed") return "Mikrofonia ei saatu käyttöön.";
  return null;
}
