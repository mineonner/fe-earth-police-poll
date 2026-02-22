import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDateRangePickerComponent } from './m-date-range-picker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [MDateRangePickerComponent],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  exports:[MDateRangePickerComponent]
})
export class MDateRangePickerModule { }
