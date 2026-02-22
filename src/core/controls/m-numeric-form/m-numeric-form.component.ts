import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'm-numeric-form',
    templateUrl: './m-numeric-form.component.html',
    styleUrl: './m-numeric-form.component.scss',
    standalone: false
})
export class MNumericFormComponent {
  @Input() title:string;
  @Input('control') f = new FormControl();
  @Input() maxLength:number = 50;
  @Input() disabled:boolean = false;
  oldValue:any = '';

  ngOnChanges(changes: SimpleChanges): void {
    if ('disabled' in changes) {
      if (changes['disabled']?.currentValue) this.f.disable();
      else this.f.enable();
    }
  }

  checkNumber(val:any){
    var numbers = /^[-+]?[0-9]+$/;
    if(val?.match(numbers) || !val){
      this.oldValue = val;
    }else{
      this.f.setValue(this.oldValue);
    }
  }

  get isRequired() { return this.f?.hasValidator(Validators.required); }
}
