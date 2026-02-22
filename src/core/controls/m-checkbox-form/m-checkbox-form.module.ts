import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MCheckboxFormComponent } from './m-checkbox-form.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [MCheckboxFormComponent],
  imports: [
    CommonModule,
    MatCheckboxModule,
    ReactiveFormsModule
  ],
  exports:[MCheckboxFormComponent]
})
export class MCheckboxFormModule { }
