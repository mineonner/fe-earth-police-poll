import { DatePipe } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'm-datepicker-form',
  templateUrl: './m-datepicker-form.component.html',
  styleUrl: './m-datepicker-form.component.scss',
  standalone: false
})
export class MDatepickerFormComponent {

  dateClone:FormControl = new FormControl();

  @Input() title:string;
  @Input() placeholder:string;
  @Input('control') f:FormControl = new FormControl();
  @Input() disabled:boolean = false;

  constructor(private datePipe: DatePipe,
    private dateAdapter: DateAdapter<any>){
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('f' in changes) {
      if(this.f) {
        this.dateClone = new FormControl('', this.f.validator);
      };

      this.dateClone.setValue(new Date(this.f.value));
    }

    if ('disabled' in changes) {
      if (changes['disabled']?.currentValue) this.f.disable();
      else this.f.enable();
    }
  }

  setDateFomat(){
    this.f.setValue(this.datePipe.transform(this.dateClone.value, 'yyyy-MM-dd'))
  }


  get isRequired() { return this.f?.hasValidator(Validators.required); }
}
