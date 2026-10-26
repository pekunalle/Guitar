import { norm } from "./theory";

export type ScaleCategory = "metal" | "mode" | "pent" | "jazz" | "world";

export type Scale = {
  id: string;
  name: string;
  categories: ScaleCategory[];
  intervals: number[];
  formula: string;
  /** Semitones that identify the scale, relative to root. */
  color: number[];
  prior: number;
  tags: string[];
  hint: string;
  modeIndex?: number;
};

export const SCALE_CATS: { id: ScaleCategory | "all"; label: string }[] = [
  { id: "metal", label: "Metalli" },
  { id: "mode", label: "Moodit" },
  { id: "pent", label: "Pentatoniset" },
  { id: "jazz", label: "Jazz" },
  { id: "world", label: "Maailma" },
  { id: "all", label: "Kaikki" },
];

export const SCALES: Scale[] = [
  {
    id: "phrygian",
    name: "Fryyginen",
    categories: ["metal", "mode"],
    intervals: [0, 1, 3, 5, 7, 8, 10],
    formula: "1 b2 b3 4 5 b6 b7",
    color: [1, 3, 8],
    prior: 1,
    modeIndex: 2,
    tags: ["phrygian", "fryyginen", "metalli", "riffi", "metallica", "tool", "gojira", "lamb of god", "megadeth", "slipknot", "rammstein", "djent"],
    hint: "Metalli-riffien perusskaala. b2 tekee soinnista heti pimeän.",
  },
  {
    id: "phrygian-dominant",
    name: "Fryyginen dominantti",
    categories: ["metal"],
    intervals: [0, 1, 4, 5, 7, 8, 10],
    formula: "1 b2 3 4 5 b6 b7",
    color: [1, 4, 8],
    prior: 0.96,
    tags: ["phrygian dominant", "spanish", "hijaz", "fryyginen dominantti", "slayer", "nile", "behemoth", "yngwie", "children of bodom", "bodom", "arch enemy", "itainen"],
    hint: "Slayer- ja neoklassinen sävy. Harmonisen mollin viides moodi.",
  },
  {
    id: "harmonic-minor",
    name: "Harmoninen molli",
    categories: ["metal"],
    intervals: [0, 2, 3, 5, 7, 8, 11],
    formula: "1 2 b3 4 5 b6 7",
    color: [3, 8, 11],
    prior: 0.94,
    tags: ["harmonic minor", "harmoninen", "molli", "yngwie", "neoclassical", "slayer", "iron maiden", "maiden", "children of bodom", "bodom", "arch enemy", "in flames", "nightwish", "opeth"],
    hint: "Nostettu septimi. Neoklassinen metalli ja dramaattinen kadenssi.",
  },
  {
    id: "natural-minor",
    name: "Luonnollinen molli",
    categories: ["metal", "mode"],
    intervals: [0, 2, 3, 5, 7, 8, 10],
    formula: "1 2 b3 4 5 b6 b7",
    color: [3, 8, 10],
    prior: 0.98,
    modeIndex: 5,
    tags: ["aeolian", "aiolinen", "natural minor", "molli", "metallica", "iron maiden", "maiden", "black sabbath", "sabbath", "opeth", "trivium", "apocalyptica", "nightwish", "judas priest"],
    hint: "Aiolinen. Laaja molli ilman harmonisen mollin terävää septimiä.",
  },
  {
    id: "minor-pent",
    name: "Mollipentatoninen",
    categories: ["metal", "pent"],
    intervals: [0, 3, 5, 7, 10],
    formula: "1 b3 4 5 b7",
    color: [3, 10],
    prior: 0.97,
    tags: ["pentatonic", "pentatoninen", "molli", "blues", "sabbath", "black sabbath", "pantera", "metallica", "alice in chains"],
    hint: "Viisi nuottia. Sabbath, Pantera ja klassinen riffimetalli.",
  },
  {
    id: "blues",
    name: "Blues",
    categories: ["metal", "pent"],
    intervals: [0, 3, 5, 6, 7, 10],
    formula: "1 b3 4 b5 5 b7",
    color: [3, 6, 10],
    prior: 0.82,
    tags: ["blues", "pentatoninen", "pantera", "sabbath", "black sabbath"],
    hint: "Mollipentatoninen plus b5. Likainen, bluespohjainen metalli.",
  },
  {
    id: "dorian",
    name: "Doorinen",
    categories: ["metal", "mode"],
    intervals: [0, 2, 3, 5, 7, 9, 10],
    formula: "1 2 b3 4 5 6 b7",
    color: [3, 9],
    prior: 0.86,
    modeIndex: 1,
    tags: ["dorian", "doorinen", "iron maiden", "maiden", "opeth", "tool"],
    hint: "Molli, jossa suuri seksti. Maiden ja Opeth, ei täysin synkkä.",
  },
  {
    id: "locrian",
    name: "Lokrinen",
    categories: ["metal", "mode"],
    intervals: [0, 1, 3, 5, 6, 8, 10],
    formula: "1 b2 b3 4 b5 b6 b7",
    color: [1, 6],
    prior: 0.7,
    modeIndex: 6,
    tags: ["locrian", "lokrinen", "djent", "meshuggah", "periphery", "diminished", "jannite"],
    hint: "b5 vie juuren alta. Djent ja dissonanssi.",
  },
  {
    id: "dim-hw",
    name: "Puoli–kokosävel diminuutio",
    categories: ["metal"],
    intervals: [0, 1, 3, 4, 6, 7, 9, 10],
    formula: "1 b2 b3 3 b5 5 6 b7",
    color: [1, 3, 6],
    prior: 0.72,
    tags: ["diminished", "diminuutio", "half whole", "half-whole", "djent", "meshuggah", "fear factory", "symmetrinen"],
    hint: "Symmetrinen kahdeksansävel. Meshuggah-henkinen jännite.",
  },
  {
    id: "dim-wh",
    name: "Koko–puolisävel diminuutio",
    categories: ["metal"],
    intervals: [0, 2, 3, 5, 6, 8, 9, 11],
    formula: "1 2 b3 4 b5 b6 6 7",
    color: [2, 6, 11],
    prior: 0.58,
    tags: ["diminished", "whole half", "dim7", "diminuutio", "jazz", "metalli"],
    hint: "Dim7 rakentuu tästä. Sama kuvio kolmen nauhan välein.",
  },
  {
    id: "hungarian-minor",
    name: "Unkarilainen molli",
    categories: ["metal"],
    intervals: [0, 2, 3, 6, 7, 8, 11],
    formula: "1 2 b3 b5 5 b6 7",
    color: [3, 6, 11],
    prior: 0.6,
    tags: ["hungarian", "gypsy", "unkari", "mustalainen", "nile", "eksoottinen"],
    hint: "Harmoninen molli, jossa b5. Itäeurooppalainen metalli.",
  },
  {
    id: "double-harmonic",
    name: "Kaksoisharmoninen",
    categories: ["metal"],
    intervals: [0, 1, 4, 5, 7, 8, 11],
    formula: "1 b2 3 4 5 b6 7",
    color: [1, 4, 11],
    prior: 0.64,
    tags: ["byzantine", "double harmonic", "kaksoisharmoninen", "nile", "behemoth", "itainen", "bysantti"],
    hint: "Kaksi ylinousevaa sekuntia. Bysantti, Nile, musta metalli.",
  },
  {
    id: "oriental",
    name: "Itämainen",
    categories: ["metal", "world"],
    intervals: [0, 1, 4, 5, 6, 9, 10],
    formula: "1 b2 3 4 b5 6 b7",
    color: [1, 4, 6],
    prior: 0.48,
    tags: ["oriental", "itainen", "itämainen", "nile", "eksoottinen"],
    hint: "b2, suuri terssi ja b5. Lyhyt itämainen riffi.",
  },
  {
    id: "persian",
    name: "Persialainen",
    categories: ["metal", "world"],
    intervals: [0, 1, 4, 5, 6, 8, 11],
    formula: "1 b2 3 4 b5 b6 7",
    color: [1, 4, 6, 11],
    prior: 0.44,
    tags: ["persian", "persia", "persialainen", "nile", "eksoottinen"],
    hint: "Persialainen tetraordi eksoottiseen teemaan.",
  },
  {
    id: "melodic-minor",
    name: "Melodinen molli",
    categories: ["metal", "jazz"],
    intervals: [0, 2, 3, 5, 7, 9, 11],
    formula: "1 2 b3 4 5 6 7",
    color: [3, 9, 11],
    prior: 0.6,
    tags: ["melodic minor", "melodinen", "jazz", "opeth", "neoclassical"],
    hint: "Suuri seksti ja septimi. Jazzmolli ja progemetalli.",
  },
  {
    id: "ionian",
    name: "Duuri (jooninen)",
    categories: ["mode"],
    intervals: [0, 2, 4, 5, 7, 9, 11],
    formula: "1 2 3 4 5 6 7",
    color: [4, 11],
    prior: 0.74,
    modeIndex: 0,
    tags: ["major", "duuri", "ionian", "jooninen"],
    hint: "Tavallinen duuri. Metallissa useammin kertosäkeen valo.",
  },
  {
    id: "lydian",
    name: "Lyydinen",
    categories: ["mode"],
    intervals: [0, 2, 4, 6, 7, 9, 11],
    formula: "1 2 3 #4 5 6 7",
    color: [6, 4],
    prior: 0.5,
    modeIndex: 3,
    tags: ["lydian", "lyydinen", "dream theater", "vai", "#4"],
    hint: "Duuri, jossa #4. Kelluva ja elokuvamainen.",
  },
  {
    id: "mixolydian",
    name: "Miksolyydinen",
    categories: ["mode"],
    intervals: [0, 2, 4, 5, 7, 9, 10],
    formula: "1 2 3 4 5 6 b7",
    color: [4, 10],
    prior: 0.58,
    modeIndex: 4,
    tags: ["mixolydian", "miksolyydinen", "dominantti", "rock", "ac/dc", "acdc"],
    hint: "Duuri ja b7. Rock-riffi ja dominanttiseiska.",
  },
  {
    id: "major-pent",
    name: "Duuripentatoninen",
    categories: ["pent"],
    intervals: [0, 2, 4, 7, 9],
    formula: "1 2 3 5 6",
    color: [4, 9],
    prior: 0.62,
    tags: ["pentatonic", "pentatoninen", "duuri", "country"],
    hint: "Duuri ilman kvarttia ja septimiä.",
  },
  {
    id: "hirajoshi",
    name: "Hirajoshi",
    categories: ["world"],
    intervals: [0, 2, 3, 7, 8],
    formula: "1 2 b3 5 b6",
    color: [2, 3, 8],
    prior: 0.4,
    tags: ["hirajoshi", "japani", "japan", "koto"],
    hint: "Japanilainen pentatoninen. Lyhyt ja heti tunnistettava.",
  },
  {
    id: "iwato",
    name: "Iwato",
    categories: ["world"],
    intervals: [0, 1, 5, 6, 10],
    formula: "1 b2 4 b5 b7",
    color: [1, 6],
    prior: 0.34,
    tags: ["iwato", "japani", "japan"],
    hint: "Synkkä japanilainen asteikko ilman terssiä ja kvinttiä.",
  },
  {
    id: "harmonic-major",
    name: "Harmoninen duuri",
    categories: ["jazz"],
    intervals: [0, 2, 4, 5, 7, 8, 11],
    formula: "1 2 3 4 5 b6 7",
    color: [4, 8, 11],
    prior: 0.42,
    tags: ["harmonic major", "harmoninen duuri", "jazz"],
    hint: "Duuri, jossa b6. Yllättävä kadenssi.",
  },
  {
    id: "lydian-dominant",
    name: "Lyydinen dominantti",
    categories: ["jazz"],
    intervals: [0, 2, 4, 6, 7, 9, 10],
    formula: "1 2 3 #4 5 6 b7",
    color: [6, 10],
    prior: 0.4,
    tags: ["lydian dominant", "mixolydian #4", "jazz", "melodinen molli"],
    hint: "Melodisen mollin neljäs moodi. #4 ja b7 yhdessä.",
  },
  {
    id: "altered",
    name: "Alteroitu",
    categories: ["jazz"],
    intervals: [0, 1, 3, 4, 6, 8, 10],
    formula: "1 b2 b3 3 b5 b6 b7",
    color: [1, 4, 6],
    prior: 0.36,
    tags: ["altered", "superlocrian", "jazz", "dominantti"],
    hint: "Dominanttiseiskan alteroinnit. Jazzsoolon jännite.",
  },
];

export function scaleById(id: string): Scale {
  return SCALES.find((s) => s.id === id) ?? SCALES[0];
}

function haystack(scale: Scale): string {
  return norm([scale.name, scale.formula, scale.hint, ...scale.tags, ...scale.categories].join(" "));
}

export function filterScales(cat: ScaleCategory | "all", query: string): Scale[] {
  const q = norm(query.trim());
  let list = SCALES.filter((s) => {
    if (q) return haystack(s).includes(q);
    return cat === "all" || s.categories.includes(cat);
  });
  if (!q && cat === "mode") list = [...list].sort((a, b) => (a.modeIndex ?? 99) - (b.modeIndex ?? 99));
  return list;
}
