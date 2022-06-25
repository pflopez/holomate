import {Component, Input, OnInit} from '@angular/core';
import {EMPTY_HOLOMATE_DATA, HolomateData} from "../holomate";

@Component({
  selector: 'app-debugger',
  templateUrl: './debugger.component.html',
  styleUrls: ['./debugger.component.scss']
})
export class DebuggerComponent implements OnInit {

  @Input() data: HolomateData = EMPTY_HOLOMATE_DATA;

  constructor() {
  }

  ngOnInit(): void {
  }

}
