import { Component, ContentChild, EventEmitter, Input, input, Output, TemplateRef } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'm-dialog',
  templateUrl: './m-dialog.component.html',
  styleUrl: './m-dialog.component.scss',
  standalone:false
})
export class MDialogComponent {

  @ContentChild('dialogHeader', { read: TemplateRef }) mDialogHeader: TemplateRef<any>;
  @ContentChild('dialogContent', { read: TemplateRef }) mDialogContent: TemplateRef<any>;
  @ContentChild('dialogAction', { read: TemplateRef }) mDialogAction: TemplateRef<any>;

  @Input() isShowDialog :boolean = false;
  @Input() width :string = '80%';

  @Output() isShowDialogChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(library: FaIconLibrary,
  ) {
    library.addIconPacks(fas, far);
  }

  closeDialog(){
    this.isShowDialog = !this.isShowDialog;
    this.isShowDialogChange.emit(this.isShowDialog);
  }
}
