export interface HolomateData {
  name: string;
  knob: number
  notes :string[];
}

export const EMPTY_HOLOMATE_DATA = { name: '', knob: 0, notes: []}


export type Effect = 'delay' | 'low-pass' | 'overdrive' | 'off';
