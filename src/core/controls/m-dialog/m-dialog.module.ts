import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDialogComponent } from './m-dialog.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [MDialogComponent],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],exports:[
    MDialogComponent
  ]
})
export class MDialogModule { }
