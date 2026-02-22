import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MInputComponent } from './m-input.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [MInputComponent],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports:[
    MInputComponent
  ]
})
export class MInputModule { }
