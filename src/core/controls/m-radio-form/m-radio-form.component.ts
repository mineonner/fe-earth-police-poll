import { Component, ContentChild, EventEmitter, Input, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { MUtilsService } from '../../services/util.service';
import { fieldsRadioModel } from './models/fields-radio.model';
import { MatRadioChange } from '@angular/material/radio';
import { AbstractControl, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'm-radio-form',
    templateUrl: './m-radio-form.component.html',
    styleUrl: './m-radio-form.component.scss',
    standalone: false
})
export class MRadioFormComponent {
  @ContentChild('titleAddOn', { read: TemplateRef }) dTitleAddOn: TemplateRef<any>;

  @Input('m-id') id?: string = 'radio-group-' + this._utils.randomId(12);
  @Input() name: string = 'radio-group-' + this._utils.randomId(12);
  @Input() options: any[] = [];
  @Input() fields:fieldsRadioModel;
  @Input() title:string;
  @Input('control') f = new FormControl();

  @Input() displayValue:any;
  @Input() displayText:any;
  @Output() inputChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() disabled:boolean = false;



  constructor(private _utils: MUtilsService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if ('disabled' in changes) {
      if (changes['disabled']?.currentValue) this.f.disable();
      else this.f.enable();
    }
  }

  onInputChange(e:MatRadioChange){
    this.inputChange.emit(e.value);
  }

  get isRequired() { return this.f?.hasValidator(Validators.required); }
}
