import {Howl} from "howler";

export class Pack {
  name: string = '';
  sounds: Record<string, Howl> = {};

  constructor(name: string, sounds: Record<string, Howl>) {
    this.name = name;
    this.sounds = sounds
  }

}

export const PACK_ONE = new Pack( 'Pack One', {
  'C4': _howl('assets/sounds/1/kick.wav'),
  'C#4': _howl('assets/sounds/1/lev.wav'),
  'D4': _howl('assets/sounds/1/tom.wav'),
  'D#4': _howl('assets/sounds/1/hat.wav'),
  'E4': _howl('assets/sounds/1/mp_abstract_decay.wav'),
  'F4': _howl('assets/sounds/1/mp_abstract_fader.wav'),
  'F#4': _howl('assets/sounds/1/mp_abstract_finger.wav'),
  'G4': _howl('assets/sounds/1/mp_abstract_howl.wav'),
  'G#4': _howl('assets/sounds/1/mp_abstract_odd.wav'),
  'A4': _howl('assets/sounds/1/mp_layer_crumble.wav'),
  'A#4': _howl('assets/sounds/1/mp_layer_krush.wav'),
  'B4': _howl('assets/sounds/1/shot_mud.wav'),
});

export const PACK_TWO = new Pack('Pack Two', {
  'C4': _howl('assets/sounds/2/kick.wav'),
  'C#4': _howl('assets/sounds/2/snare.wav'),
  'D4': _howl('assets/sounds/2/rain.wav'),
  'D#4': _howl('assets/sounds/2/clap.wav'),
  'E4': _howl('assets/sounds/2/guiro.wav'),
  'F4': _howl('assets/sounds/2/hat-closed.wav'),
  'F#4': _howl('assets/sounds/2/hat-closed-b.wav'),
  'G4': _howl('assets/sounds/2/hat-open.wav'),
  'G#4': _howl('assets/sounds/2/hat-reverse.wav'),
  'A4': _howl('assets/sounds/2/c-black.wav'),
  'A#4': _howl('assets/sounds/2/c-sharp.wav'),
  'B4': _howl('assets/sounds/2/e.wav'),
});

function _howl(file: string) {
  return new Howl({
    src: [file],
    volume: 0.5
  })
}
