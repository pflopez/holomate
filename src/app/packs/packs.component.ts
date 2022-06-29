import {Component} from '@angular/core';
import {HolomateService} from "../holomate.service";

@Component({
  selector: 'app-packs',
  templateUrl: './packs.component.html',
  styleUrls: ['./packs.component.scss']
})
export class PacksComponent {

  packNames = this.holomate.getPackNames();

  constructor(private holomate: HolomateService) {
  }

  selectPack(event: any) {
    this.holomate.selectPack(event.target.value as number)
  }

}
