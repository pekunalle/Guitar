import { useMemo, useState } from "react";
import { CHORD_CATS, filterChords, type ChordCategory } from "@/lib/music/chords";
import { SCALE_CATS, filterScales, type ScaleCategory } from "@/lib/music/scales";
import { useKitara } from "@/lib/store";

export function ScaleLibrary() {
  const [cat, setCat] = useState<ScaleCategory | "all">("metal");
  const [q, setQ] = useState("");
  const scaleId = useKitara((s) => s.scaleId);
  const setScaleId = useKitara((s) => s.setScaleId);
  const setTab = useKitara((s) => s.setTab);
  const list = useMemo(() => filterScales(cat, q), [cat, q]);

  return (
    <div>
      <p className="kicker">Skaalat</p>
      <h1 className="title mt-1">Metalli ensin</h1>
      <p className="mt-2 text-sm text-muted">Haku katsoo nimen, kaavan ja bändin. Kokeile fryyginen, djent tai Slayer.</p>
      <input className="field mt-3" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Hae: fryyginen, djent, Slayer" aria-label="Hae skaaloja" />
      <div className="row-scroll mt-3">
        {SCALE_CATS.map((item) => (
          <button type="button" key={item.id} className="chip" data-on={!q && cat === item.id ? "1" : "0"} onClick={() => { setCat(item.id); setQ(""); }}>
            {item.label}
          </button>
        ))}
      </div>
      {q ? <p className="mt-2 text-sm text-muted">Haku koko kirjastosta · {list.length} osumaa</p> : null}
      <div className="mt-3 flex flex-col gap-2">
        {list.length === 0 ? <p className="panel text-sm text-muted">Ei osumia. Kokeile: molli, djent, Maiden.</p> : null}
        {list.map((scale) => (
          <button
            type="button"
            key={scale.id}
            className="card-btn"
            data-on={scale.id === scaleId ? "1" : "0"}
            onClick={() => {
              setScaleId(scale.id);
              setTab("board");
            }}
          >
            <span className="flex items-baseline justify-between gap-3">
              <span className="font-display text-2xl uppercase tracking-wide">{scale.name}</span>
              {scale.categories.includes("metal") ? <span className="kicker">Metalli</span> : null}
            </span>
            <span className="formula">{scale.formula}</span>
            <span className="mt-1 block text-sm text-muted">{scale.hint}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function ChordLibrary() {
  const [cat, setCat] = useState<ChordCategory | "all">("metal");
  const [q, setQ] = useState("");
  const chordId = useKitara((s) => s.chordId);
  const setChordId = useKitara((s) => s.setChordId);
  const setTab = useKitara((s) => s.setTab);
  const list = useMemo(() => filterChords(cat, q), [cat, q]);

  return (
    <div>
      <p className="kicker">Soinnut</p>
      <h1 className="title mt-1">Voima ensin</h1>
      <p className="mt-2 text-sm text-muted">Metallisoinnot ovat ensimmäisenä. Haku löytää myös djentin ja Slayerin.</p>
      <input className="field mt-3" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Hae: voimasointu, djent, dim" aria-label="Hae sointuja" />
      <div className="row-scroll mt-3">
        {CHORD_CATS.map((item) => (
          <button type="button" key={item.id} className="chip" data-on={!q && cat === item.id ? "1" : "0"} onClick={() => { setCat(item.id); setQ(""); }}>
            {item.label}
          </button>
        ))}
      </div>
      {q ? <p className="mt-2 text-sm text-muted">Haku koko kirjastosta · {list.length} osumaa</p> : null}
      <div className="mt-3 flex flex-col gap-2">
        {list.length === 0 ? <p className="panel text-sm text-muted">Ei osumia. Kokeile: molli, sus2, voima.</p> : null}
        {list.map((chord) => (
          <button
            type="button"
            key={chord.id}
            className="card-btn"
            data-on={chord.id === chordId ? "1" : "0"}
            onClick={() => {
              setChordId(chord.id);
              setTab("board");
            }}
          >
            <span className="flex items-baseline justify-between gap-3">
              <span className="font-display text-2xl uppercase tracking-wide">{chord.name}</span>
              {chord.categories.includes("metal") ? <span className="kicker">Metalli</span> : null}
            </span>
            <span className="formula">{chord.formula}</span>
            <span className="mt-1 block text-sm text-muted">{chord.hint}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
