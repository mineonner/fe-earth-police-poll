import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'm-textarea',
    templateUrl: './m-textarea.component.html',
    styleUrl: './m-textarea.component.scss',
    standalone: false
})
export class MTextareaComponent {
  @Input() title:string;
  @Input() value:any;
  @Input() maxLength:number = 50;
  @Input() disabled:boolean = false;
  @Input() className:string;
  @Input() isRequired:boolean = false;
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  onInputChange(e:any){
    this.valueChange.emit(e);
  }
}
