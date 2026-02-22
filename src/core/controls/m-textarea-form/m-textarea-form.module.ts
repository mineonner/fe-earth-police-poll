import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MTextareaFormComponent } from './m-textarea-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [MTextareaFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[MTextareaFormComponent]
})
export class MTextareaFormModule { }
