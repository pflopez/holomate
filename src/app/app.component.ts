import {ChangeDetectorRef, Component, HostListener, OnInit} from '@angular/core';
import { map } from 'rxjs';
import {EMPTY_HOLOMATE_DATA, HolomateData} from "./holomate";
import {HolomateService} from "./holomate.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'holomate';

  data: HolomateData = EMPTY_HOLOMATE_DATA;

  showDebugger = false;

  started = false;

  classes$ = this.holomate.notes$.pipe(
    map( notes => {
      return notes.map( note => note.replace('#', 'sharp')).join(' ')
    })
  )

  constructor(private holomate: HolomateService, private changeDetection: ChangeDetectorRef) {
  }

  ngOnInit() {
  }


  start() {
    this.started = true;
    this.holomate.enable();

    this.holomate.notes$.subscribe(() => this.changeDetection.detectChanges());
    this.holomate.knob$.subscribe(() => this.changeDetection.detectChanges());
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key == 'd') {
      // D key
      this.showDebugger = !this.showDebugger;
    }
  }

}
