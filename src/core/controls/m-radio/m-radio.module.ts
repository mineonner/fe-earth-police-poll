import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MRadioComponent } from './m-radio.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [MRadioComponent],
  imports: [
    CommonModule,
    MatRadioModule,
    FormsModule,
  ],
  exports:[
    MRadioComponent
  ]
})
export class MRadioModule { }
