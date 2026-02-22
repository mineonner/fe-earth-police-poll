import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MPaginationComponent } from './m-pagination.component';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  declarations: [MPaginationComponent],
  imports: [
    CommonModule,
    MatPaginatorModule
  ],
  exports:[
    MPaginationComponent
  ]
})
export class MPaginationModule { }
