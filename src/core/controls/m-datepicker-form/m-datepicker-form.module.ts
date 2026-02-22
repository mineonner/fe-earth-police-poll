import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDatepickerFormComponent } from './m-datepicker-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [MDatepickerFormComponent],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  exports:[
    MDatepickerFormComponent
  ]
})
export class MDatepickerFormModule { }
