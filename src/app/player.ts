import {Howl, Howler} from 'howler';
import 'howler-plugin-effect-chain';
import Tuna from 'tunajs';
import {Effect} from "./holomate";
import {Pack, PACK_ONE, PACK_TWO} from "./pack";

export class Player {
  packs: Pack[] = [PACK_ONE, PACK_TWO];
  selectedPack = PACK_ONE;

  customPack = new Pack('custom pack', {});

  sound = new Howl({
    src: ['assets/sounds/1/kick.wav']
  });

  tuna = new Tuna(Howler.ctx);

  effects: Partial<Record<Effect, any>> = {};

  constructor() {

  }

  play(note: string) {
    if(this.selectedPack?.sounds[note]){
      // do we want to stop the note?
      this.selectedPack.sounds[note].stop();
      this.selectedPack.sounds[note].play();
    }
  }

  updateEffect(value: number) {
    if(this.effects['delay']){
      this.effects['delay'].delayTime = value * 10;
    }
    if(this.effects['overdrive']){
      this.effects['overdrive'].drive = value / 100;
    }
    if(this.effects['low-pass']){
      this.effects['low-pass'].frequency = value * 10;
    }
    if(this.effects['reverb']){
      this.effects['reverb'].wetLevel = value / 100;
    }
  }

  toggleEffect(effect: Effect): Effect[] {
    if (this.effects[effect]) {
      this.removeEffect(effect);
    } else {
      this.addEffect(effect);
    }
    return Object.keys(this.effects) as Effect[];
  }

  selectPack(packIndex: number){
    if(packIndex > this.packs.length){
      this.selectedPack = this.customPack;
    }else {
      this.selectedPack = this.packs[packIndex];
    }

  }

  private removeEffect(effect: Effect) {
    const tunaEffect = this.effects[effect];
    if (tunaEffect) {
      // @ts-ignore
      Howler.removeEffect(tunaEffect);
      delete this.effects[effect];
    }
  }


  private addEffect(effect: Effect) {
    let fx: any;
    switch (effect) {

      case "low-pass":
        fx = new this.tuna.Filter({
          frequency: 800,         //20 to 22050
          Q: 1,                   //0.001 to 100
          gain: 0,                //-40 to 40 (in decibels)
          filterType: "lowpass",  //lowpass, highpass, bandpass, lowshelf, highshelf, peaking, notch, allpass
          bypass: 0
        });
        this.effects['low-pass'] = fx;
        break
      case 'delay':
        fx = new this.tuna.Delay({
          feedback: 0.45,    //0 to 1+
          delayTime: 100,    //1 to 10000 milliseconds
          wetLevel: 0.5,     //0 to 1+
          dryLevel: 1,       //0 to 1+
          cutoff: 20000,      //cutoff frequency of the built in lowpass-filter. 20 to 22050
          bypass: 0
        });
        this.effects["delay"] = fx;
        break
      case "overdrive":
        fx = new this.tuna.Overdrive({
          outputGain: -9.154,           //-42 to 0 in dB
          drive: 0.197,                 //0 to 1
          curveAmount: 0.979,           //0 to 1
          algorithmIndex: 0,            //0 to 5, selects one of the drive algorithms
          bypass: 0
        });
        this.effects["overdrive"] = fx;
        break

      case "reverb":
        fx = new this.tuna.Convolver({
          highCut: 22050,                         //20 to 22050
          lowCut: 20,                             //20 to 22050
          dryLevel: 1,                            //0 to 1+
          wetLevel: 1,                            //0 to 1+
          level: 1,                               //0 to 1+, adjusts total output of both wet and dry
          impulse: "assets/impulses/impulse_rev.wav",    //the path to your impulse response
          bypass: 0
        });
        this.effects["reverb"] = fx;
        break
    }
    if (fx) {
      // @ts-ignore
      Howler.addEffect(fx);
    }

  }


  updateCustomPackNote(noteName: string, howl: Howl){
    // this.player.updateCustomPackNote(noteName, howl);
    this.customPack.sounds[noteName] = howl;
  }
}
