import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { BaseOptionDropdownModel } from '../../../../core/models/BaseOptionDropdown.model';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: false
})
export class DashboardComponent implements OnInit {
  selectedTabIndex: number = 0;
  yearsOption:BaseOptionDropdownModel[] = [];
  years:string = null;

  ngOnInit(): void {
    this.initYearsOption();
  }

  private initYearsOption(): void {
    const currentCeYear = new Date().getFullYear();
    const currentBeYear = currentCeYear + 543; // แปลง ค.ศ. เป็น พ.ศ.
    this.years = currentBeYear.toString();
    this.yearsOption = [];
    for (let i = 0; i <= 5; i++) {
      const year = (currentBeYear - i).toString();
      this.yearsOption.push({ id: year, name: year });
    }
  }

  onSelectedTabChange(obj: MatTabChangeEvent) {
    // console.log(obj);
  }
}
