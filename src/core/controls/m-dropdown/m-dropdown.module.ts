import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDropdownComponent } from './m-dropdown.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    MDropdownComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxMatSelectSearchModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  exports:[
    MDropdownComponent
  ]
})
export class MDropdownModule { }
