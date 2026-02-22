import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'm-textarea-form',
    templateUrl: './m-textarea-form.component.html',
    styleUrl: './m-textarea-form.component.scss',
    standalone: false
})
export class MTextareaFormComponent {
  @Input() title:string;
  @Input('control') f = new FormControl();
  @Input() maxLength:number = 50;
  @Input() disabled:boolean = false;
  @Input() className:string;

  ngOnChanges(changes: SimpleChanges): void {
    if ('disabled' in changes) {
      if (changes['disabled']?.currentValue) this.f.disable();
      else this.f.enable();
    }
  }


  get isRequired() { return this.f?.hasValidator(Validators.required); }
}
