import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MInputFormComponent } from './m-input-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [MInputFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    MInputFormComponent
  ]
})
export class MInputFormModule { }
