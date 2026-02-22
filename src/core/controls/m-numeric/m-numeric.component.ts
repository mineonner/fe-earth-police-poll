import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MUtilsService } from '../../services/util.service';

@Component({
    selector: 'm-numeric',
    templateUrl: './m-numeric.component.html',
    styleUrl: './m-numeric.component.scss',
    standalone: false
})
export class MNumericComponent {
  @Input() title:string;
  @Input() value:any;
  @Input() maxLength:number = 50;
  @Input() disabled:boolean = false;
  @Input() className:string;
  @Input() isRequired:boolean = false;
  @Input('m-id') id?: string = 'input-' + this._utils.randomId(12);
  oldValue:any = '';

  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _utils: MUtilsService) { }

  onInputChange(e:any){
    this.valueChange.emit(e);
  }

  checkNumber(val:any){
    var numbers = /^[-+]?[0-9]+$/;
    if(val?.match(numbers) || !val){
      this.oldValue = val;
      this.valueChange.emit(this.oldValue);
    }else{
      this.valueChange.emit(this.oldValue);
    }
  }
}
