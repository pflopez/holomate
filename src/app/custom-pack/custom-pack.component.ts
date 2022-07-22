import {Component, OnInit} from '@angular/core';
import {HolomateService} from "../holomate.service";

@Component({
  selector: 'app-custom-pack',
  templateUrl: './custom-pack.component.html',
  styleUrls: ['./custom-pack.component.scss']
})
export class CustomPackComponent implements OnInit {


  notes = [
    {note: 'A4', icon: 'emoji-04.png'},
    {note: 'A#4', icon: 'emoji-05.png'},
    {note: 'B4', icon: 'emoji-06.png'},

    {note: 'F#4', icon: 'emoji-07.png'},
    {note: 'G4', icon: 'emoji-08.png'},
    {note: 'G#4', icon: 'emoji-09.png'},

    {note: 'D#4', icon: 'emoji-10.png'},
    {note: 'E4', icon: 'emoji-11.png'},
    {note: 'F4', icon: 'emoji-12.png'},

    {note: 'C4', icon: 'emoji-13.png'},
    {note: 'C#4', icon: 'emoji-14.png'},
    {note: 'D4', icon: 'emoji-15.png'},
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
