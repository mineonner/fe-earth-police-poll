import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDateRangePickerFormComponent } from './m-date-range-picker-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [MDateRangePickerFormComponent],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  exports:[MDateRangePickerFormComponent]
})
export class MDateRangePickerFormModule { }
