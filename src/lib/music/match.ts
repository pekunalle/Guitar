import { SCALES, scaleById, type Scale } from "./scales";
import { degreeName, noteName, pcOf, type Spell } from "./theory";

export type PlayedNote = { pc: number; midi: number };

export type ScaleMatch = {
  scaleId: string;
  root: number;
  score: number;
  contained: boolean;
  exact: boolean;
  outside: number[];
  colorHit: number;
};

export function uniquePcs(notes: PlayedNote[]): number[] {
  const seen = new Set<number>();
  const out: number[] = [];
  for (const n of notes) {
    const pc = pcOf(n.pc);
    if (seen.has(pc)) continue;
    seen.add(pc);
    out.push(pc);
  }
  return out;
}

export function matchScales(notes: PlayedNote[]): ScaleMatch[] {
  const unique = uniquePcs(notes);
  if (unique.length < 2) return [];
  const first = pcOf(notes[0].pc);
  const last = pcOf(notes[notes.length - 1].pc);
  const lowest = pcOf(notes.reduce((a, b) => (a.midi <= b.midi ? a : b)).pc);
  const found: ScaleMatch[] = [];

  for (const scale of SCALES) {
    for (let root = 0; root < 12; root++) {
      const set = new Set(scale.intervals.map((i) => (root + i) % 12));
      const outside = unique.filter((pc) => !set.has(pc));
      if (outside.length > 1) continue;
      const contained = outside.length === 0;
      const exact = contained && unique.length === scale.intervals.length;
      const colorInside = scale.color.filter((c) => unique.includes((root + c) % 12)).length;
      const colorHit = scale.color.length ? colorInside / scale.color.length : 0;
      const tightness = unique.length / scale.intervals.length;
      let score = contained ? 1 : 0.12;
      score += scale.prior * (contained ? 0.5 : 0.12);
      score += colorHit * (contained ? 0.9 : 0.35);
      score += tightness * 0.45;
      if (exact) score += 1.55;
      if (first === root) score += 0.14;
      if (last === root) score += 0.1;
      if (lowest === root) score += 0.12;
      if (!unique.includes(root)) score -= 0.2;
      found.push({ scaleId: scale.id, root, score, contained, exact, outside, colorHit });
    }
  }

  found.sort((a, b) => b.score - a.score);
  const contained = found.filter((m) => m.contained).slice(0, 8);
  if (contained.length >= 2) return contained;
  const near = found.filter((m) => !m.contained).slice(0, 3);
  return [...contained, ...near];
}

export function pitchSetKey(scale: Scale, root: number): string {
  return scale.intervals
    .map((i) => (root + i) % 12)
    .sort((a, b) => a - b)
    .join(".");
}

export function motif(notes: PlayedNote[], root: number, finnish: boolean, spell?: Spell): { notes: string; degrees: string } {
  const names = notes.map((n) => noteName(n.pc, finnish));
  const degrees = notes.map((n) => degreeName(n.pc, root, spell));
  return { notes: names.join(" → "), degrees: degrees.join(" ") };
}

export function matchTitle(match: ScaleMatch, finnish: boolean): string {
  const scale = scaleById(match.scaleId);
  return `${noteName(match.root, finnish)} ${scale.name.toLowerCase()}`;
}

export function confidence(match: ScaleMatch, uniqueCount: number): string {
  if (!match.contained) return "Melkein — yksi nuotti ulkona";
  if (match.exact) return "Täysi skaala";
  if (uniqueCount <= 3 || match.colorHit < 0.5) return "Mahdollinen — soita lisää, niin lista tarkentuu";
  return "Vahva osuma";
}
