import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: false
})
export class DashboardComponent {
  selectedTabIndex: number = 0;
  onSelectedTabChange(obj: MatTabChangeEvent) {
    // console.log(obj);
  }
}
