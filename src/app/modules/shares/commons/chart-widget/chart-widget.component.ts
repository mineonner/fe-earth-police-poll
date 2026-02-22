import { Component, Input, OnChanges, SimpleChanges, ViewChild, viewChild } from '@angular/core';
import { ApexOptions } from 'apexcharts';
import { ChartComponent } from 'ng-apexcharts';

@Component({
  selector: 'chart-widget',
  standalone: false,
  templateUrl: './chart-widget.component.html',
  styleUrl: './chart-widget.component.scss'
})
export class ChartWidgetComponent implements OnChanges {
  @ViewChild('chart') chart: ChartComponent;
  @Input() chartOptions: ApexOptions;
  loader:boolean = false;
  constructor() {

  }

  async ngOnChanges(changes: SimpleChanges){
    if ('chartOptions' in changes) {
      while (!this.chart) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      this.chart.updateOptions(this.chartOptions);
    }
  }
}
