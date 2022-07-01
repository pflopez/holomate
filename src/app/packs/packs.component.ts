import {Component, EventEmitter, Output} from '@angular/core';
import {HolomateService} from "../holomate.service";

@Component({
  selector: 'app-packs',
  templateUrl: './packs.component.html',
  styleUrls: ['./packs.component.scss']
})
export class PacksComponent {

  packNames = this.holomate.getPackNames();

  @Output() selectPack = new EventEmitter<number>();

  constructor(private holomate: HolomateService) {
  }

  select(event: any) {
    this.selectPack.emit(event.target.value as number);
  }

}
