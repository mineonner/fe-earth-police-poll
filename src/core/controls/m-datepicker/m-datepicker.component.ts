import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output, signal, SimpleChanges } from '@angular/core';
import { DateAdapter, } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import 'moment/locale/th';


@Component({
  selector: 'm-datepicker',
  templateUrl: './m-datepicker.component.html',
  styleUrl: './m-datepicker.component.scss',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MDatepickerComponent {


  @Input() title:string;
  @Input() isRequired:boolean = false;
  @Input() placeholder:string;
  @Input() value:string;
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
  valueClone:any;

  constructor(private datePipe: DatePipe,
    private dateAdapter: DateAdapter<any>){
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('value' in changes) {
      if(this.value) {
        this.valueClone = new Date(this.value);
      };
    }
  }

  setDateFomat(event){
   this.value =   this.datePipe.transform(this.valueClone._d, 'yyyy-MM-dd')
    this.valueChange.emit(this.value);
  }
}
