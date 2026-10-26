import { norm } from "./theory";

export type ChordCategory = "metal" | "triad" | "seventh" | "add";

export type Chord = {
  id: string;
  name: string;
  categories: ChordCategory[];
  intervals: number[];
  formula: string;
  tags: string[];
  hint: string;
};

export const CHORD_CATS: { id: ChordCategory | "all"; label: string }[] = [
  { id: "metal", label: "Metalli" },
  { id: "triad", label: "Kolmisoinnut" },
  { id: "seventh", label: "Septimit" },
  { id: "add", label: "Lisätyt" },
  { id: "all", label: "Kaikki" },
];

export const CHORDS: Chord[] = [
  {
    id: "power",
    name: "Voimasointu",
    categories: ["metal"],
    intervals: [0, 7],
    formula: "1 5",
    tags: ["power", "5", "voima", "voimasointu", "metalli", "djent", "sabbath", "metallica", "palm", "chug"],
    hint: "Juuri ja kvintti. Ei terssiä, sopii molliin ja duuriin.",
  },
  {
    id: "tritone",
    name: "Tritonus",
    categories: ["metal"],
    intervals: [0, 6],
    formula: "1 b5",
    tags: ["tritone", "tritonus", "slayer", "jannite", "dim", "diabolus"],
    hint: "Juuri ja b5. Yksi askel, ja riffi kuulostaa vaaralliselta.",
  },
  {
    id: "min",
    name: "Molli",
    categories: ["metal", "triad"],
    intervals: [0, 3, 7],
    formula: "1 b3 5",
    tags: ["minor", "molli", "opeth", "sad"],
    hint: "Pieni kolmisointu.",
  },
  {
    id: "maj",
    name: "Duuri",
    categories: ["triad"],
    intervals: [0, 4, 7],
    formula: "1 3 5",
    tags: ["major", "duuri"],
    hint: "Suuri kolmisointu. Metallissa usein vain kertosäkeessä.",
  },
  {
    id: "dim",
    name: "Dimi",
    categories: ["metal", "triad"],
    intervals: [0, 3, 6],
    formula: "1 b3 b5",
    tags: ["dim", "diminished", "dimi", "jannite"],
    hint: "Pieni terssi ja vähennetty kvintti.",
  },
  {
    id: "aug",
    name: "Ylinouseva",
    categories: ["triad"],
    intervals: [0, 4, 8],
    formula: "1 3 #5",
    tags: ["aug", "augmented", "ylinouseva"],
    hint: "Suuri terssi ja ylinouseva kvintti.",
  },
  {
    id: "sus2",
    name: "Sus2",
    categories: ["metal", "add"],
    intervals: [0, 2, 7],
    formula: "1 2 5",
    tags: ["sus2", "avoin", "djent", "atmosphere", "moderni"],
    hint: "Terssin tilalla sekunti. Avoin moderni metalli.",
  },
  {
    id: "sus4",
    name: "Sus4",
    categories: ["metal", "add"],
    intervals: [0, 5, 7],
    formula: "1 4 5",
    tags: ["sus4", "jannite", "purkaus"],
    hint: "Kvarttisuspensio. Purkautuu molliin tai duuriin.",
  },
  {
    id: "min-b6",
    name: "Molli b6",
    categories: ["metal"],
    intervals: [0, 3, 8],
    formula: "1 b3 b6",
    tags: ["b6", "slayer", "harmoninen", "doom", "molli"],
    hint: "Harmonisen mollin väri: pieni terssi ja b6.",
  },
  {
    id: "min7",
    name: "Molli7",
    categories: ["seventh"],
    intervals: [0, 3, 7, 10],
    formula: "1 b3 5 b7",
    tags: ["m7", "minor7", "jazz", "opeth"],
    hint: "Molli ja pieni septimi.",
  },
  {
    id: "dom7",
    name: "Dominanttiseiska",
    categories: ["seventh", "metal"],
    intervals: [0, 4, 7, 10],
    formula: "1 3 5 b7",
    tags: ["7", "dominant", "blues", "seiska", "rock"],
    hint: "Duuri ja b7. Bluesrock ja kadenssi.",
  },
  {
    id: "maj7",
    name: "Maj7",
    categories: ["seventh"],
    intervals: [0, 4, 7, 11],
    formula: "1 3 5 7",
    tags: ["maj7", "jazz", "duuri"],
    hint: "Duuri ja suuri septimi.",
  },
  {
    id: "m7b5",
    name: "Puolidimi",
    categories: ["seventh", "metal"],
    intervals: [0, 3, 6, 10],
    formula: "1 b3 b5 b7",
    tags: ["m7b5", "half diminished", "half-diminished", "lokrinen", "jazz"],
    hint: "Lokrinen sointu. Kulkeva välisointu.",
  },
  {
    id: "dim7",
    name: "Dim7",
    categories: ["seventh", "metal"],
    intervals: [0, 3, 6, 9],
    formula: "1 b3 b5 bb7",
    tags: ["dim7", "diminished", "symmetrinen"],
    hint: "Symmetrinen. Sama sointu kolmen nauhan välein.",
  },
  {
    id: "add9",
    name: "Add9",
    categories: ["add"],
    intervals: [0, 2, 4, 7],
    formula: "1 2 3 5",
    tags: ["add9", "avoin", "duuri"],
    hint: "Duuri lisätyllä sekunnilla.",
  },
  {
    id: "madd9",
    name: "Molli add9",
    categories: ["add", "metal"],
    intervals: [0, 2, 3, 7],
    formula: "1 2 b3 5",
    tags: ["madd9", "minor add9", "opeth", "atmosphere", "doom"],
    hint: "Molli ja 9. Progen ja doomin avoin väri.",
  },
];

export function chordById(id: string): Chord {
  return CHORDS.find((c) => c.id === id) ?? CHORDS[0];
}

function haystack(chord: Chord): string {
  return norm([chord.name, chord.formula, chord.hint, ...chord.tags, ...chord.categories].join(" "));
}

export function filterChords(cat: ChordCategory | "all", query: string): Chord[] {
  const q = norm(query.trim());
  return CHORDS.filter((c) => {
    if (q) return haystack(c).includes(q);
    return cat === "all" || c.categories.includes(cat);
  });
}
