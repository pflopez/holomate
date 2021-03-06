import {Injectable} from '@angular/core';
import {Effect, EMPTY_HOLOMATE_DATA, HolomateData} from "./holomate";
import {WebMidi} from "webmidi";
import {BehaviorSubject, Subject} from "rxjs";
import {Player} from "./player";
import {Howl} from "howler";

@Injectable({
  providedIn: 'root'
})
export class HolomateService {

  data: HolomateData = EMPTY_HOLOMATE_DATA;

  notes$ = new BehaviorSubject<string[]>(this.data.notes);
  knob$ = new BehaviorSubject<number>(this.data.knob);
  effects$ = new Subject<Effect[]>();
  hold$ = new BehaviorSubject<boolean>(this.data.hold);

  player: Player | undefined;

  constructor() {
  }

  enable() {
    this.player = new Player();
    WebMidi.enable().then(() => this.onMidiEnabled())
      .catch(err => alert(err));
  }

  onMidiEnabled() {
    this.listenForDevice();
  }

  listenForDevice() {
    // Display available MIDI input devices
    if (WebMidi.inputs.length < 1) {
      this.data.name = "No device detected.";
    } else {
      let inputNames: string[] = [];
      WebMidi.inputs.forEach((device, index) => {
        inputNames.push(`${index}: ${device.name}`);
      });
      this.data.name = inputNames.join(',');
      this.data.connected = true;
      this.listenForNotes();
      this.listenForKnob();
    }
  }

  listenForNotes() {
    // Listen to 'note on' events on channels 1, 2 and 3 of the first input MIDI device
    WebMidi.inputs[0].addListener("noteon", e => {
      this.data.notes.push(e.note.identifier);
      this.notes$.next(this.data.notes);
      if (this.player) {
        this.player.play(e.note.identifier);
      }

    }, {channels: [1, 2, 3]});

    WebMidi.inputs[0].addListener("noteoff", e => {
      this.data.notes = this.data.notes.filter((note) => note != e.note.identifier);
      this.notes$.next(this.data.notes);
      if(!this.data.hold){
        this.player?.stop(e.note.identifier)
      }

    }, {channels: [1, 2, 3]});
  }

  listenForKnob() {
    WebMidi.inputs[0].addListener('controlchange', e => {
      const value = Math.round(e.value as number * 100);
      this.data.knob = value;
      if (this.player) {
        this.player.updateEffect(value);
      }
      this.knob$.next(this.data.knob);
    }, {channels: [1, 2, 3]});
  }

  toggleEffect(effect: Effect) {
    if (this.player) {
      const effects = this.player.toggleEffect(effect);
      this.effects$.next(effects);
    }
  }

  getPackNames(): string[] {
    if (this.player) {
      return this.player?.packs.map(pack => pack.name);
    }
    return [];
  }

  selectPack(packIndex: number){
    if(this.player){
      this.player.selectPack(packIndex);
    }
  }

  updateCustomPackNote(noteName: string, data: string, fileName: string) {
    if(this.player){
      this.player.updateCustomPackNote(noteName, data, fileName);
    }
  }



  updateSetting(setting: string){
    switch (setting){
      case 'hold':
        this.data.hold = !this.data.hold;
        this.hold$.next(this.data.hold);
        break;
    }
  }

}
