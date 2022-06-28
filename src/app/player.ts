import {Howl, Howler} from 'howler';
import 'howler-plugin-effect-chain';
import Tuna from 'tunajs';
import {Effect} from "./holomate";

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
    'B4': _howl('assets/sounds/shot_mud.wav'),
  }

  sound = new Howl({
    src: ['assets/sounds/kick.wav']
  });

  tuna = new Tuna(Howler.ctx);


  effect: any;

  constructor() {

  }

  play(note: string) {
    this.sounds[note].play();
  }

  updateEffect(value: number) {
    if (this.effect?.delayTime) {
      this.effect.delayTime = value * 10;
    }
    if (this.effect?.frequency) {
      this.effect.frequency = value * 10;
    }
    if(this.effect?.drive){
      this.effect.drive = value / 100;
    }
  }
  

  addEffect(effect: Effect) {
    if (this.effect) {
      // @ts-ignore
      Howler.removeEffect(this.effect);
    }
    switch (effect) {
      case "low-pass":
        this.effect = new this.tuna.Filter({
          frequency: 800,         //20 to 22050
          Q: 1,                   //0.001 to 100
          gain: 0,                //-40 to 40 (in decibels)
          filterType: "lowpass",  //lowpass, highpass, bandpass, lowshelf, highshelf, peaking, notch, allpass
          bypass: 0
        });
        break
      case 'delay':
        this.effect = new this.tuna.Delay({
          feedback: 0.45,    //0 to 1+
          delayTime: 100,    //1 to 10000 milliseconds
          wetLevel: 0.5,     //0 to 1+
          dryLevel: 1,       //0 to 1+
          cutoff: 20000,      //cutoff frequency of the built in lowpass-filter. 20 to 22050
          bypass: 0
        });
        break
      case "overdrive":
        this.effect = new this.tuna.Overdrive({
          outputGain: -9.154,           //-42 to 0 in dB
          drive: 0.197,                 //0 to 1
          curveAmount: 0.979,           //0 to 1
          algorithmIndex: 0,            //0 to 5, selects one of the drive algorithms
          bypass: 0
        });
        break
    }
    // @ts-ignore
    Howler.addEffect(this.effect);
  }
}


function _howl(file: string) {
  return new Howl({
    src: [file]
  })
}
