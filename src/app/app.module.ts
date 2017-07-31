import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { MaterializeModule } from 'angular2-materialize';

import { Angular2TokenService } from 'angular2-token';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    MaterializeModule
  ],
  providers: [ Angular2TokenService ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
