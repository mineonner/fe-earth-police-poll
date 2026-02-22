import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MTextareaComponent } from './m-textarea.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [MTextareaComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[MTextareaComponent]
})
export class MTextareaModule { }
