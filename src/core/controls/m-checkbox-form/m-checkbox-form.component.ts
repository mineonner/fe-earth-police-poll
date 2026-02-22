import { Component, ContentChild, EventEmitter, Input, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
    selector: 'm-checkbox-form',
    templateUrl: './m-checkbox-form.component.html',
    styleUrl: './m-checkbox-form.component.scss',
    standalone: false
})
export class MCheckboxFormComponent {
  @ContentChild('titleAddOn', { read: TemplateRef }) dTitleAddOn: TemplateRef<any>;

  @Input() title:string;
  @Input('control') f = new FormControl();
  @Input() disabled:boolean = false;

  @Output() inputChange: EventEmitter<any> = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if ('disabled' in changes) {
      if (changes['disabled']?.currentValue) this.f.disable();
      else this.f.enable();
    }
  }

  onInputChange(e:MatCheckboxChange){
    this.inputChange.emit(e.checked);
  }
}
