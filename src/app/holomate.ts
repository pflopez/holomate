export interface HolomateData {
  name: string;
  knob: number
  notes :string[];
  connected: boolean;
}

export const EMPTY_HOLOMATE_DATA = { name: '', knob: 0, notes: [], connected: false}


export type Effect = 'delay' | 'low-pass' | 'overdrive' | 'reverb';
