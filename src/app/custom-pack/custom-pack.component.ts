import {Component, OnInit} from '@angular/core';
import {HolomateService} from "../holomate.service";

@Component({
  selector: 'app-custom-pack',
  templateUrl: './custom-pack.component.html',
  styleUrls: ['./custom-pack.component.scss']
})
export class CustomPackComponent implements OnInit {

  notes = [
    {note: 'A4', icon: 'vientito-01.png'},
    {note: 'A#4', icon: 'vientito-02.png'},
    {note: 'B4', icon: 'vientito-03.png'},

    {note: 'F#4', icon: 'vientito-04.png'},
    {note: 'G4', icon: 'vientito-05.png'},
    {note: 'G#4', icon: 'vientito-06.png'},

    {note: 'D#4', icon: 'vientito-07.png'},
    {note: 'E4', icon: 'vientito-08.png'},
    {note: 'F4', icon: 'vientito-09.png'},

    {note: 'C4', icon: 'vientito-10.png'},
    {note: 'C#4', icon: 'vientito-11.png'},
    {note: 'D4', icon: 'vientito-12.png'},
  ]

  constructor(private holomate: HolomateService) {
  }

  ngOnInit(): void {
  }

  useFile(event: any, note: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        let data = reader.result;
        if (data) {
          this.holomate.updateCustomPackNote(note, data as string, file.name.split('.').pop().toLowerCase(),);
        }

      });
      reader.readAsDataURL(file);
    }
  }
}
