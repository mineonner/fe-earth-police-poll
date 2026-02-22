import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MUtilsService } from '../../services/util.service';

@Component({
    selector: 'm-input',
    templateUrl: './m-input.component.html',
    styleUrl: './m-input.component.scss',
    standalone: false
})
export class MInputComponent {
  @Input() title:string;
  @Input() value:any;
  @Input() maxLength:number = 50;
  @Input() disabled:boolean = false;
  @Input() className:string;
  @Input() isRequired:boolean = false;
  @Input('m-id') id?: string = 'input-' + this._utils.randomId(12);

  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _utils: MUtilsService) { }

  onInputChange(e:any){
    this.valueChange.emit(e);
  }
}
