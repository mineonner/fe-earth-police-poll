import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { DateRangeModel } from '../../models/DateRange.model';

@Component({
  selector: 'm-date-range-picker',
  templateUrl: './m-date-range-picker.component.html',
  styleUrl: './m-date-range-picker.component.scss',
  standalone: false
})
export class MDateRangePickerComponent {

  startClone: any;
  endClone: any;


  @Input() title: string;
  @Input() isRequired: boolean = false;
  @Input() placeholder: string;
  @Input() value: DateRangeModel = new DateRangeModel();
  @Input() placeholderStart: string = 'วันที่เริ่มต้น';
  @Input() placeholderEnd: string = 'วันที่สิ้นสุด';
  @Output() valueChange: EventEmitter<DateRangeModel> = new EventEmitter<DateRangeModel>();

  constructor(private datePipe: DatePipe) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('value' in changes) {
      if(this.value) {
        this.startClone = new Date(this.value.start) ?? null;
        this.endClone = new Date(this.value.end) ?? null;
      };
    }
  }

  setDateStart(event) {
    if (!!this.startClone) {
      this.value.start = this.datePipe.transform(this.startClone._d, 'yyyy-MM-dd');
    } else {
      this.value.start = null;
    }

    this.valueChange.emit(this.value);
  }

  setDateEnd(event) {
    if (!!this.endClone) {
      this.value.end = this.datePipe.transform(this.endClone._d, 'yyyy-MM-dd');
    } else {
      this.value.end = null;
    }
    this.valueChange.emit(this.value);
  }
}
