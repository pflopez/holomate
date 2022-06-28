import {Injectable} from '@angular/core';
import {Effect, EMPTY_HOLOMATE_DATA, HolomateData} from "./holomate";
import {WebMidi} from "webmidi";
import {BehaviorSubject, Subject} from "rxjs";
import {Player} from "./player";

@Injectable({
  providedIn: 'root'
})
export class HolomateService {

  data: HolomateData = EMPTY_HOLOMATE_DATA;

  notes$ = new BehaviorSubject<string[]>(this.data.notes);
  knob$ = new BehaviorSubject<number>(this.data.knob);
  effect$ = new Subject<Effect>();

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


  addEffect(effect: Effect) {
    if (this.player) {
      this.player.addEffect(effect);
    }
    this.effect$.next(effect);
  }

}
