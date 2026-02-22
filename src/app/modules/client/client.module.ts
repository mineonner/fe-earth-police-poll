import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { CommonsModule } from '../shares/commons/commons.module';
import { HomeComponent } from './home/home.component';
import { ControlsModule } from '../../../core/controls/controls.module';


@NgModule({
  declarations: [
    ClientComponent
    , HomeComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    CommonsModule,
    ControlsModule
  ]
})
export class ClientModule { }
