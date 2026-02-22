import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDropdowmFormComponent } from './m-dropdowm-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    MDropdowmFormComponent
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
      MDropdowmFormComponent
  ]
})
export class MDropdowmFormModule { }
