import {Component, HostListener, Inject, Renderer2} from '@angular/core';
import {EMPTY_HOLOMATE_DATA, HolomateData} from "./holomate";
import {HolomateService} from "./holomate.service";
import {DOCUMENT} from "@angular/common";

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

  inverted = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private holomate: HolomateService) {
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

  toggleTheme(){

    if(this.inverted){
      this.renderer.removeClass(this.document.body, 'inverted');
    }else{
      this.renderer.addClass(this.document.body, 'inverted');
    }
    this.inverted =!this.inverted;
  }
}
