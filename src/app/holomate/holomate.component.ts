import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HolomateService} from "../holomate.service";
import {map, tap} from "rxjs";

@Component({
  selector: 'app-holomate',
  templateUrl: './holomate.component.html',
  styleUrls: ['./holomate.component.scss']
})
export class HolomateComponent implements OnInit {


  notes = [
    {note: 'A4', active: false, icon: 'vientito-01.png'},
    {note: 'A#4', active: false, icon: 'vientito-02.png'},
    {note: 'B4', active: false, icon: 'vientito-03.png'},

    {note: 'F#4', active: false, icon: 'vientito-04.png'},
    {note: 'G4', active: false, icon: 'vientito-05.png'},
    {note: 'G#4', active: false, icon: 'vientito-06.png'},

    {note: 'D#4', active: false, icon: 'vientito-07.png'},
    {note: 'E4', active: false, icon: 'vientito-08.png'},
    {note: 'F4', active: false, icon: 'vientito-09.png'},

    {note: 'C4', active: false, icon: 'vientito-10.png'},
    {note: 'C#4', active: false, icon: 'vientito-11.png'},
    {note: 'D4', active: false, icon: 'vientito-12.png'},
  ]


  activeNotes: string[] = [];


  rotation$ = this.holomate.knob$.pipe(map(value => {
    const deg = 15 + value * 330 / 100;
    return `transform: rotate(${deg}deg)`;
  }));


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
