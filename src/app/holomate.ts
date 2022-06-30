export interface HolomateData {
  name: string;
  knob: number
  notes :string[];
  connected: boolean;
}

export const EMPTY_HOLOMATE_DATA = { name: '', knob: 0, notes: [], connected: false}


export type Effect = 'delay' | 'low-pass' | 'overdrive' | 'reverb';

export const COLORS: Record<string, string> = {
  'C4': '#12963d',
  'C#4': '#e7322d',
  'D4': '#89509b',

  'D#4': '#89509b',
  'E4': '#127ab5',
  'F4': '#fddb18',

  'F#4': '#127ab5',
  'G4': '#9d9fa6',
  'G#4': '#f07c14',

  'A4': '#9d9fa6',
  'A#4': '#fddb18',
  'B4': '#9d9fa6',
}
