import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HolomateService} from "../holomate.service";
import {combineLatest, map, startWith, tap} from "rxjs";

@Component({
  selector: 'app-holomate',
  templateUrl: './holomate.component.html',
  styleUrls: ['./holomate.component.scss']
})
export class HolomateComponent implements OnInit {


  notes = [
    {note: 'A4', active: false, icon: 'emoji-04.png'},
    {note: 'A#4', active: false, icon: 'emoji-05.png'},
    {note: 'B4', active: false, icon: 'emoji-06.png'},

    {note: 'F#4', active: false, icon: 'emoji-07.png'},
    {note: 'G4', active: false, icon: 'emoji-08.png'},
    {note: 'G#4', active: false, icon: 'emoji-09.png'},

    {note: 'D#4', active: false, icon: 'emoji-10.png'},
    {note: 'E4', active: false, icon: 'emoji-11.png'},
    {note: 'F4', active: false, icon: 'emoji-12.png'},

    {note: 'C4', active: false, icon: 'emoji-13.png'},
    {note: 'C#4', active: false, icon: 'emoji-14.png'},
    {note: 'D4', active: false, icon: 'emoji-15.png'},
  ]


  activeNotes: string[] = [];


  rotation$ = this.holomate.knob$.pipe(map(value => {
    const deg = 15 + value * 330 / 100;
    return `transform: rotate(${deg}deg)`;
  }));

  color$ = this.holomate.effects$.pipe(
    startWith([]),
    map(effects => effects[effects.length - 1])
  );


  constructor(private holomate: HolomateService, private changeDetection: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.holomate.notes$.pipe(map(d => {
        this.notes.forEach(k => {
          k.active = d.some(note => note === k.note);
        })
      }),
      tap(_ => this.changeDetection.detectChanges())).subscribe()
  }
}
