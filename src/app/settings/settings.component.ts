import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Effect} from "../holomate";
import {HolomateService} from "../holomate.service";
import {map, tap} from "rxjs";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  delayOn$ = this.holomate.effects$.pipe(
    map(effects => effects.some(f => f === 'delay'))
  )

  filterOn$ = this.holomate.effects$.pipe(
    map(effects => effects.some(f => f === 'low-pass'))
  )

  overdriveOn$ = this.holomate.effects$.pipe(
    map(effects => effects.some(f => f === 'overdrive'))
  )

  reverbOn$ = this.holomate.effects$.pipe(
    map(effects => effects.some(f => f === 'reverb'))
  )

  constructor(private holomate: HolomateService) {
  }

  ngOnInit(): void {
  }

  effect(effect: Effect) {
    this.holomate.toggleEffect(effect);
  }


}
