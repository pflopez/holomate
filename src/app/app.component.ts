import {Component, HostListener} from '@angular/core';
import {EMPTY_HOLOMATE_DATA, HolomateData} from "./holomate";
import {HolomateService} from "./holomate.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'holomate';

  data: HolomateData = EMPTY_HOLOMATE_DATA;

  showDebugger = false;

  started = false;

  showCustom = false;

  constructor(private holomate: HolomateService) {
  }


  start() {
    this.started = true;
    this.holomate.enable();
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key == 'd') {
      // D key
      this.showDebugger = !this.showDebugger;
    }
  }

  selectPack(index: number) {
    this.showCustom = index > this.holomate.getPackNames().length;
    this.holomate.selectPack(index);
  }

}
