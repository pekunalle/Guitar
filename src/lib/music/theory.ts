export const SHARP = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"] as const;
export const FINNISH = ["C", "Cis", "D", "Dis", "E", "F", "Fis", "G", "Gis", "A", "B", "H"] as const;

const DEGREE = ["1", "b2", "2", "b3", "3", "4", "b5", "5", "b6", "6", "b7", "7"] as const;
const INTERVAL = ["P1", "p2", "s2", "p3", "s3", "p4", "tt", "p5", "p6", "s6", "p7", "s7"] as const;

export type LabelMode = "note" | "degree" | "interval";

export function pcOf(n: number): number {
  return ((n % 12) + 12) % 12;
}

export function noteName(pc: number, finnish: boolean): string {
  return finnish ? FINNISH[pcOf(pc)] : SHARP[pcOf(pc)];
}

export function noteWithOctave(midi: number, finnish: boolean): string {
  const name = noteName(pcOf(midi), finnish);
  const octave = Math.floor(midi / 12) - 1;
  return `${name}${octave}`;
}

export function midiToFreq(midi: number): number {
  return 440 * 2 ** ((midi - 69) / 12);
}

export function freqToMidi(freq: number): number {
  return 69 + 12 * Math.log2(freq / 440);
}

export type Spell = { sharp4?: boolean; sharp5?: boolean };

export function degreeName(pc: number, root: number, spell?: Spell): string {
  const semi = pcOf(pc - root);
  if (semi === 6 && spell?.sharp4) return "#4";
  if (semi === 8 && spell?.sharp5) return "#5";
  return DEGREE[semi];
}

export function intervalName(pc: number, root: number, spell?: Spell): string {
  const semi = pcOf(pc - root);
  if (semi === 6 && spell?.sharp4) return "#4";
  if (semi === 8 && spell?.sharp5) return "#5";
  return INTERVAL[semi];
}

export function labelFor(pc: number, root: number, mode: LabelMode, finnish: boolean, spell?: Spell): string {
  if (mode === "note") return noteName(pc, finnish);
  if (mode === "degree") return degreeName(pc, root, spell);
  return intervalName(pc, root, spell);
}

export function spellFromFormula(formula: string): Spell {
  return { sharp4: formula.includes("#4"), sharp5: formula.includes("#5") };
}

export function norm(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

export function midiOf(open: number, fret: number): number {
  return open + fret;
}
