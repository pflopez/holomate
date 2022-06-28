import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Effect} from "../holomate";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  @Output() addEffect = new EventEmitter<Effect>();

  activeEffect: Effect = 'off';

  constructor() {
  }

  ngOnInit(): void {
  }

  effect(effect: Effect) {
    this.activeEffect = effect;
    this.addEffect.emit(effect);
  }

}
