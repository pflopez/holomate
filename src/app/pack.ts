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
  'C4': _howl('assets/sounds/kick.wav'),
  'C#4': _howl('assets/sounds/lev.wav'),
  'D4': _howl('assets/sounds/tom.wav'),
  'D#4': _howl('assets/sounds/hat.wav'),
  'E4': _howl('assets/sounds/mp_abstract_decay.wav'),
  'F4': _howl('assets/sounds/mp_abstract_fader.wav'),
  'F#4': _howl('assets/sounds/mp_abstract_finger.wav'),
  'G4': _howl('assets/sounds/mp_abstract_howl.wav'),
  'G#4': _howl('assets/sounds/mp_abstract_odd.wav'),
  'A4': _howl('assets/sounds/mp_layer_crumble.wav'),
  'A#4': _howl('assets/sounds/mp_layer_krush.wav'),
  'B4': _howl('assets/sounds/shot_mud.wav'),
});

export const PACK_TWO = new Pack('Pack Two', {
  'C4': _howl('assets/sounds/shot_mud.wav'),
  'C#4': _howl('assets/sounds/shot_mud.wav'),
  'D4': _howl('assets/sounds/shot_mud.wav'),
  'D#4': _howl('assets/sounds/shot_mud.wav'),
  'E4': _howl('assets/sounds/shot_mud.wav'),
  'F4': _howl('assets/sounds/shot_mud.wav'),
  'F#4': _howl('assets/sounds/shot_mud.wav'),
  'G4': _howl('assets/sounds/shot_mud.wav'),
  'G#4': _howl('assets/sounds/shot_mud.wav'),
  'A4': _howl('assets/sounds/shot_mud.wav'),
  'A#4': _howl('assets/sounds/shot_mud.wav'),
  'B4': _howl('assets/sounds/shot_mud.wav'),
});



function _howl(file: string) {
  return new Howl({
    src: [file]
  })
}
