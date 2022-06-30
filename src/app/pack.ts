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
  'C4': _howl('assets/sounds/2/kick_low.wav'),
  'C#4': _howl('assets/sounds/2/low_noses.wav'),
  'D4': _howl('assets/sounds/2/bass_drum.wav'),
  'D#4': _howl('assets/sounds/2/snare.wav'),
  'E4': _howl('assets/sounds/2/hit-hat.wav'),
  'F4': _howl('assets/sounds/2/ride.wav'),
  'F#4': _howl('assets/sounds/2/bass.wav'),
  'G4': _howl('assets/sounds/2/alarm.wav'),
  'G#4': _howl('assets/sounds/2/act_cmin.wav'),
  'A4': _howl('assets/sounds/2/chord_em.wav'),
  'A#4': _howl('assets/sounds/2/chord_dm7.wav'),
  'B4': _howl('assets/sounds/2/chord_b.wav'),
});



function _howl(file: string) {
  return new Howl({
    src: [file]
  })
}
