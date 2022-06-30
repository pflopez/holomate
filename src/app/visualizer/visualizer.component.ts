import {Component, OnInit} from '@angular/core';
import {Howler} from "howler";

const WIDTH = 500;
const HEIGHT = 500;

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.scss']
})
export class VisualizerComponent implements OnInit {

  analyser: any;
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
    this.analyser = Howler.ctx.createAnalyser();

    // Connect the masterGain -> analyser (disconnecting masterGain -> destination)
    Howler.masterGain.connect(this.analyser);

    // Connect the analyser -> destination
    this.analyser.connect(Howler.ctx.destination);
    // How much data should we collect
    this.analyser.fftSize = 2 ** 10;
    // pull the data off the audio
    const timeData = new Uint8Array(this.analyser.frequencyBinCount);
    this.drawTimeData(timeData);
  }

  drawTimeData(timeData: any) {

    if(this.analyser){
      this.analyser.getByteTimeDomainData(timeData);
    }
    if(this.ctx){
      this.ctx.lineWidth = 4;
      this.ctx.strokeStyle = "#ff7d00";
      this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
      this.ctx.beginPath();
      const bufferLength = this.analyser.frequencyBinCount;
      const sliceWidth = 500 / bufferLength;
      let x = 0;
      timeData.forEach((data: any, i: number) => {
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
      this.ctx.stroke();

    }

    // call itself as soon as possible
    requestAnimationFrame(() => this.drawTimeData(timeData));
  }


}
