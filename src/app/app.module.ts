import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {DebuggerComponent} from './debugger/debugger.component';
import {HolomateComponent} from './holomate/holomate.component';
import {SettingsComponent} from './settings/settings.component';
import {PacksComponent} from './packs/packs.component';
import {VisualizerComponent} from './visualizer/visualizer.component';
import { CustomPackComponent } from './custom-pack/custom-pack.component';


@NgModule({
  declarations: [
    AppComponent,
    DebuggerComponent,
    HolomateComponent,
    SettingsComponent,
    PacksComponent,
    VisualizerComponent,
    CustomPackComponent

  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
