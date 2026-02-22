import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'm-date-range-picker-form',
  templateUrl: './m-date-range-picker-form.component.html',
  styleUrl: './m-date-range-picker-form.component.scss',
  standalone: false
})
export class MDateRangePickerFormComponent {

  @Input() title: string;
  @Input() isRequired: boolean = false;
  @Input() placeholder: string;
  @Input() placeholderStart: string = 'วันที่เริ่มต้น';
  @Input() placeholderEnd: string = 'วันที่สิ้นสุด';

  form: FormControl = new FormControl({
    start: null,
    end: null
  });

  formClone:FormGroup = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  // @Input('control') f = new FormControl();
  f() { return this.form }
  fclone() { return this.formClone.controls }
  @Input('control') public set _f(form: FormControl) {
    this.form = form;
    if (this.form) {
      this.form.setValue({
        start: this.form.value?.start,
        end: this.form.value?.end
      });


      this.formClone.controls['start'].setValue(this.form.value?.start ? new Date(this.form.value?.start) : null)
      this.formClone.controls['end'].setValue(this.form.value?.end ? new Date(this.form.value?.end) : null)
      console.log(this.formClone.value);
    }
  }

  constructor(private datePipe: DatePipe) {

  }

  setDateStart(event) {
    console.log(this.formClone.value);
    if (!!event.value) {
      this.form.setValue({
        start : this.datePipe.transform(event.value._d, 'yyyy-MM-dd'),
        end: this.form.value.end,
      })
    } else {
      this.form.setValue({
        start : null,
        end: this.form.value.end,
      })
    }
    console.log(this.form.value);
  }

  setDateEnd(event) {
    if (!!event.value) {
      this.form.setValue({
        start : this.form.value.start,
        end : this.datePipe.transform(event.value._d, 'yyyy-MM-dd')
      })
    } else {
      this.form.setValue({
        start : this.form.value.start,
        end : null
      })
    }
    console.log(this.form.value);
  }
}
