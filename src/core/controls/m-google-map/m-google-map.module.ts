import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MGoogleMapComponent } from './m-google-map.component';
import {GoogleMap, MapMarker} from '@angular/google-maps';
import { MInputModule } from '../m-input/m-input.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [MGoogleMapComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    GoogleMap,
    MapMarker
  ],
  exports:[
    MGoogleMapComponent
  ]
})
export class MGoogleMapModule { }
