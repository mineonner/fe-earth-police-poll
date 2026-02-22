import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MUtilsService } from '../../services/util.service';

@Component({
    selector: 'm-input-form',
    templateUrl: './m-input-form.component.html',
    styleUrl: './m-input-form.component.scss',
    standalone: false
})
export class MInputFormComponent {
  @Input() title:string;
  @Input('control') f = new FormControl();
  @Input() maxLength:number = 50;
  @Input() disabled:boolean = false;
  @Input('m-id') id?: string = 'input-' + this._utils.randomId(12);
  @Input() inputType:'text' | 'password' = 'text'

  constructor(private _utils: MUtilsService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if ('disabled' in changes) {
      if (changes['disabled']?.currentValue) this.f.disable();
      else this.f.enable();
    }
  }


  get isRequired() { return this.f?.hasValidator(Validators.required); }
}
