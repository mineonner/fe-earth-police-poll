import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MRadioFormComponent } from './m-radio-form.component';
import {MatRadioModule} from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [MRadioFormComponent],
  imports: [
    CommonModule,
    MatRadioModule,
    ReactiveFormsModule
  ],
  exports:[
    MRadioFormComponent
  ]
})
export class MRadioFormModule { }
