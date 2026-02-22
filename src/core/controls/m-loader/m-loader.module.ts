import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MLoaderComponent } from './m-loader.component';
  import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';


@NgModule({
  declarations: [
    MLoaderComponent
  ],
  imports: [
    CommonModule,
    NgxSkeletonLoaderModule
  ],
  exports: [
    MLoaderComponent
  ]
})
export class MLoaderModule { }
