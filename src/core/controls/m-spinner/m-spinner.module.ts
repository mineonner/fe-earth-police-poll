import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MSpinnerComponent } from './m-spinner.component';



@NgModule({
  declarations: [MSpinnerComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports:[MSpinnerComponent]
})
export class MSpinnerModule { }
