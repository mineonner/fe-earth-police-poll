import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MCheckboxComponent } from './m-checkbox.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [MCheckboxComponent],
  imports: [
    CommonModule,
    MatCheckboxModule,
    FormsModule,
  ], exports: [MCheckboxComponent]
})
export class MCheckboxModule { }
