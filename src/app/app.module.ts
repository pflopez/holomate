import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DebuggerComponent } from './debugger/debugger.component';
import { HolomateComponent } from './holomate/holomate.component';

@NgModule({
  declarations: [
    AppComponent,
    DebuggerComponent,
    HolomateComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
