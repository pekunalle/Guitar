import { useEffect, useState } from "react";
import { startMetronome } from "@/lib/music/audio";
import { EXERCISES } from "@/lib/music/exercises";
import { useKitara } from "@/lib/store";

const BEATS = [3, 4, 6, 7];

export function PracticeView() {
  const done = useKitara((s) => s.done);
  const toggleDone = useKitara((s) => s.toggleDone);
  const bpm = useKitara((s) => s.bpm);
  const beats = useKitara((s) => s.beats);
  const setBpm = useKitara((s) => s.setBpm);
  const setBeats = useKitara((s) => s.setBeats);
  const setScaleId = useKitara((s) => s.setScaleId);
  const setTab = useKitara((s) => s.setTab);
  const [openId, setOpenId] = useState(EXERCISES[0].id);
  const [running, setRunning] = useState(false);
  const [beat, setBeat] = useState(0);
  const exercise = EXERCISES.find((e) => e.id === openId) ?? EXERCISES[0];

  useEffect(() => {
    if (!running) return;
    setBeat(0);
    return startMetronome(bpm, beats, setBeat);
  }, [running, bpm, beats]);

  return (
    <div className="flex flex-col gap-3">
      <div>
        <p className="kicker">Reeni</p>
        <h1 className="title mt-1">Harjoitus ja metronomi</h1>
        <p className="mt-2 text-sm text-muted">
          Tehty {done.length}/{EXERCISES.length}. Nosta tempoa vasta kun pätkä on puhdas.
        </p>
      </div>

      <div className="panel">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-display text-2xl uppercase tracking-wide tabular-nums">{bpm} bpm</p>
          <button type="button" className="btn btn-primary" onClick={() => setRunning((v) => !v)}>
            {running ? "Pysäytä" : "Metronomi"}
          </button>
        </div>
        <input
          className="mt-3 w-full accent-primary"
          type="range"
          min={40}
          max={200}
          value={bpm}
          aria-label="Tempo"
          onChange={(e) => setBpm(Number(e.target.value))}
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {BEATS.map((n) => (
            <button type="button" key={n} className="choice" data-on={beats === n ? "1" : "0"} onClick={() => setBeats(n)}>
              {n} iskua
            </button>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2" aria-hidden="true">
          {Array.from({ length: beats }, (_, i) => (
            <span key={i} className="beat" data-on={running && beat === i ? "1" : "0"}>
              {i + 1}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {EXERCISES.map((item) => {
          const on = item.id === exercise.id;
          const marked = done.includes(item.id);
          return (
            <div key={item.id} className="card-btn" data-on={on ? "1" : "0"}>
              <button type="button" className="w-full text-left" onClick={() => setOpenId(item.id)}>
                <span className="kicker">{item.level}{marked ? " · tehty" : ""}</span>
                <span className="mt-1 block font-display text-2xl uppercase tracking-wide">{item.title}</span>
              </button>
              {on ? (
                <div className="mt-2">
                  <p className="text-sm text-muted">{item.body}</p>
                  <ol className="mt-2 list-decimal pl-5 text-sm text-muted">
                    {item.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="btn"
                      onClick={() => {
                        setBpm(item.bpm);
                        setBeats(item.beats);
                        setRunning(true);
                      }}
                    >
                      Aloita {item.bpm} bpm
                    </button>
                    <button
                      type="button"
                      className="btn"
                      onClick={() => {
                        setScaleId(item.scaleId);
                        setTab("board");
                      }}
                    >
                      Avaa skaala
                    </button>
                    <button type="button" className="btn" data-on={marked ? "1" : "0"} onClick={() => toggleDone(item.id)}>
                      {marked ? "Tehty" : "Merkitse tehdyksi"}
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
