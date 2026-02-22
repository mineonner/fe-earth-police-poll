import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MNumericComponent } from './m-numeric.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [MNumericComponent],
  imports: [
    CommonModule,
    FormsModule
  ],exports:[
    MNumericComponent
  ]
})
export class MNumericModule { }
