export type Tuning = {
  id: string;
  name: string;
  /** MIDI note numbers, lowest string first. */
  midi: number[];
};

export const TUNINGS: Tuning[] = [
  { id: "standard", name: "Vakio E", midi: [40, 45, 50, 55, 59, 64] },
  { id: "drop-d", name: "Drop D", midi: [38, 45, 50, 55, 59, 64] },
  { id: "d-standard", name: "D-vire", midi: [38, 43, 48, 53, 57, 62] },
  { id: "drop-c", name: "Drop C", midi: [36, 43, 48, 53, 57, 62] },
  { id: "c-standard", name: "C-vire", midi: [36, 41, 46, 51, 55, 60] },
  { id: "drop-b", name: "Drop B", midi: [35, 42, 47, 52, 56, 61] },
  { id: "b-standard", name: "B-vire", midi: [35, 40, 45, 50, 54, 59] },
  { id: "drop-a", name: "Drop A", midi: [33, 40, 45, 50, 54, 59] },
  { id: "open-d", name: "Open D", midi: [38, 45, 50, 54, 57, 62] },
  { id: "open-g", name: "Open G", midi: [38, 43, 50, 55, 59, 62] },
  { id: "seven", name: "7-kielinen B", midi: [35, 40, 45, 50, 55, 59, 64] },
  { id: "seven-drop-a", name: "7 Drop A", midi: [33, 40, 45, 50, 55, 59, 64] },
  { id: "seven-drop-g", name: "7 Drop G", midi: [31, 38, 43, 48, 53, 57, 62] },
];

export function tuningById(id: string): Tuning {
  return TUNINGS.find((t) => t.id === id) ?? TUNINGS[0];
}
