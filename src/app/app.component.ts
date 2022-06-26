import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {WebMidi} from "webmidi";
import {EMPTY_HOLOMATE_DATA, HolomateData} from "./holomate";
import {HolomateService} from "./holomate.service";
import {Player} from "./player";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'holomate';


  data: HolomateData = EMPTY_HOLOMATE_DATA;

  started = false;

  constructor(private holomate: HolomateService, private changeDetection: ChangeDetectorRef) {
  }


  ngOnInit() {
  }

  start(){
    this.started = true;
    this.holomate.enable();

    this.holomate.changes$.subscribe(() => this.changeDetection.detectChanges());

  }


}
