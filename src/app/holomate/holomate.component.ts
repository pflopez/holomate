import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HolomateService} from "../holomate.service";
import {map} from "rxjs";

@Component({
  selector: 'app-holomate',
  templateUrl: './holomate.component.html',
  styleUrls: ['./holomate.component.scss']
})
export class HolomateComponent implements OnInit {


  notes = [
    {note: 'C4', active: false},
    {note: 'C#4', active: false},
    {note: 'D4', active: false},
    {note: 'D#4', active: false},
    {note: 'E4', active: false},
    {note: 'F4', active: false},
    {note: 'F#4', active: false},
    {note: 'G4', active: false},
    {note: 'G#4', active: false},
    {note: 'A4', active: false},
    {note: 'A#4', active: false},
    {note: 'B4', active: false},
  ]


  activeNotes: string[] = [];


  notes$ = this.holomate.changes$.pipe(map(d => {

    this.notes.forEach(k => {
      k.active = d.notes.some(note => note === k.note);
    })
    this.changeDetection.detectChanges();
    return this.notes;

  }))


  constructor(private holomate: HolomateService,  private changeDetection: ChangeDetectorRef) {
  }

  ngOnInit(): void {

  }
}