import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MNumericFormComponent } from './m-numeric-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [MNumericFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],exports: [
    MNumericFormComponent
  ]
})
export class MNumericFormModule { }
