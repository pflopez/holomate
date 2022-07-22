import {Component, Input, OnInit} from '@angular/core';
import {Howler} from "howler";
import {COLORS, EMPTY_HOLOMATE_DATA, HolomateData} from "../holomate";

const WIDTH = 500;
const HEIGHT = 500;

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.scss']
})
export class VisualizerComponent implements OnInit {

  @Input() data: HolomateData = EMPTY_HOLOMATE_DATA;

  analyzer: any;
  ctx: any;

  constructor() {
  }

  ngOnInit(): void {

    const canvas = document.querySelector('canvas');
    if (canvas) {
      this.ctx = canvas.getContext('2d');
      canvas.width = WIDTH;
      canvas.height = HEIGHT;
      this.getAudio();
    }
  }


  getAudio() {
    // Create an analyser node in the Howler WebAudio context
    this.analyzer = Howler.ctx.createAnalyser();
    // Connect the masterGain -> analyser (disconnecting masterGain -> destination)
    Howler.masterGain.connect(this.analyzer);

    // Connect the analyser -> destination
    this.analyzer.connect(Howler.ctx.destination);
    // How much data should we collect
    this.analyzer.fftSize = 2 ** 10;
    // pull the data off the audio
    const timeData = new Uint8Array(this.analyzer.frequencyBinCount);
    this.drawTimeData(timeData);
  }

  drawTimeData(timeData: any) {
    let drawLine = false;
    if (this.analyzer) {
      this.analyzer.getByteTimeDomainData(timeData);
    }

    const color = COLORS[this.data.notes[0]] || '#D0D0D0';
    if (this.ctx) {

      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = color;
      this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
      this.ctx.beginPath();
      const bufferLength = this.analyzer.frequencyBinCount;
      const sliceWidth = 500 / bufferLength;
      let x = 0;
      timeData.forEach((data: any, i: number) => {
        if (data !== 128) {
          drawLine = true;
        }
        const v = data / 128;
        const y = (v * HEIGHT) / 2;
        // draw our lines
        if (i === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
        x += sliceWidth;
      });
      if (drawLine) {
        this.ctx.stroke();
      }
    }
    // call itself as soon as possible
    requestAnimationFrame(() => this.drawTimeData(timeData));
  }


}
