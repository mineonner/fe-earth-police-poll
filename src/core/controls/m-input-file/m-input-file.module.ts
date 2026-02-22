import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MInputFileComponent } from './m-input-file.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { mFileSizePipe } from '../../pipes/d-file-size.pipe';



@NgModule({
  declarations: [MInputFileComponent, mFileSizePipe],
  imports: [
    CommonModule,
    NgxFileDropModule,
    FontAwesomeModule,
  ],
  exports:[MInputFileComponent]
})
export class MInputFileModule { }
