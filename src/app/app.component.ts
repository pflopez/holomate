import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {WebMidi} from "webmidi";
import {EMPTY_HOLOMATE_DATA, HolomateData} from "./holomate";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'holomate';


  data: HolomateData = EMPTY_HOLOMATE_DATA;

  constructor(private changeDetection: ChangeDetectorRef) {
  }


  ngOnInit() {
    this.enable();
  }

  enable(){
    WebMidi.enable().then(() => this.onMidiEnabled())
      .catch(err => alert(err));
  }

  onMidiEnabled() {
    //const mySynth = WebMidi.inputs[0];
    //console.log(mySynth);
    this.listenForDevice();
    this.listenForNotes();
    this.listenForKnob();
  }

  listenForDevice(){
    // Display available MIDI input devices
    if (WebMidi.inputs.length < 1) {
      this.data.name = "No device detected.";
    } else {
      let inputNames: string[] =[];
      WebMidi.inputs.forEach((device, index) => {
        inputNames.push(`${index}: ${device.name}`);
      });
      this.data.name = inputNames.join(',');
    }
  }

  listenForNotes(){
    // Listen to 'note on' events on channels 1, 2 and 3 of the first input MIDI device
    WebMidi.inputs[0].addListener("noteon", e => {
      this.data.notes.push(e.note.identifier);
      this.changeDetection.detectChanges();

    }, {channels: [1, 2, 3]});

    WebMidi.inputs[0].addListener("noteoff", e => {

      this.data.notes = this.data.notes.filter((note) => note != e.note.identifier)
      this.changeDetection.detectChanges()

    }, {channels: [1, 2, 3]});
  }



  listenForKnob(){
    WebMidi.inputs[0].addListener('controlchange', e => {
      const value = Math.round(e.value as number * 100);
      this.data.knob = value;
      this.changeDetection.detectChanges();
    }, {channels: [1, 2, 3]});
  }
}
