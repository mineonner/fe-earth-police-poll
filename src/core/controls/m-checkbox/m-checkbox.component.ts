import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
    selector: 'm-checkbox',
    templateUrl: './m-checkbox.component.html',
    styleUrl: './m-checkbox.component.scss',
    standalone: false
})
export class MCheckboxComponent {
  @ContentChild('titleAddOn', { read: TemplateRef }) dTitleAddOn: TemplateRef<any>;

  @Input() title:string;
  @Input() value:any;
  @Input() disabled:boolean = false;

  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  onInputChange(e:MatCheckboxChange){
    this.valueChange.emit(e.checked);
  }
}
