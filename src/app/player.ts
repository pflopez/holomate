import {Howl} from "howler";

export class Player {

  // notes
  // C C# D D# E F F# G G# A A# B
  sounds: Record<string, Howl> = {
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
    'B4': _howl('assets/sounds/mp_layer_taik.wav'),
  }

  sound = new Howl({
    src: ['assets/sounds/kick.wav']
  });

  constructor() {
  }

  play(note: string) {
    console.log(note);
    this.sounds[note].play();
  }
}


function _howl(file: string) {
  return new Howl({
    src: [file]
  })
}
