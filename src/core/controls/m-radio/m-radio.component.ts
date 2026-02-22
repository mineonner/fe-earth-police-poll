import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { fieldsRadioModel } from '../m-radio-form/models/fields-radio.model';
import { FormControl } from '@angular/forms';
import { MUtilsService } from '../../services/util.service';
import { MatRadioChange } from '@angular/material/radio';

@Component({
    selector: 'm-radio',
    templateUrl: './m-radio.component.html',
    styleUrl: './m-radio.component.scss',
    standalone: false
})
export class MRadioComponent {
  @ContentChild('titleAddOn', { read: TemplateRef }) dTitleAddOn: TemplateRef<any>;

  @Input('m-id') id?: string = 'radio-group-' + this._utils.randomId(12);
  @Input() name: string = 'radio-group-' + this._utils.randomId(12);
  @Input() options: any[] = [];
  @Input() value:any;
  @Input() fields:fieldsRadioModel;
  @Input() title:string;
  @Input() isRequired:boolean = false;
  @Input() displayValue:any;
  @Input() displayText:any;
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();



  constructor(private _utils: MUtilsService) { }

  onInputChange(e:MatRadioChange){
    this.valueChange.emit(e.value);
  }
}
