import { DecimalPipe } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ApexOptions } from 'apexcharts';



@Component({
  selector: 'evaluation-total-widget',
  standalone: false,
  templateUrl: './evaluation-total-widget.component.html',
  styleUrl: './evaluation-total-widget.component.scss'
})
export class EvaluationTotalWidgetComponent implements OnChanges {
  @Input() categories: string[] = [];
  @Input() series: ApexNonAxisChartSeries = [];
  @Input() legend: ApexLegend;
  @Input() loader: boolean = true;
  chartOptions: ApexOptions;

  constructor(private decimalPipe: DecimalPipe) {
    let th = this;

    this.chartOptions = {
      series: [],
      chart: {
        type: "donut"
      },
      legend:{
        show: true
      },
      labels: [],
      colors: ['#66dd66', '#cf4547'],
      responsive: [
        {
          breakpoint: 200,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
      tooltip: {
        y: {
          formatter: function (val, opts) {
            return `${th.decimalPipe.transform(val ?? '0', '1.0-2')}`;
          },
        }
      },
      noData: {
        text: "ไม่มีข้อมูล",
        align: 'center',
        verticalAlign: 'middle',
        style: {
          fontSize: '16px',
          fontFamily: 'Arial',
          color: '#263238'
        }
      }
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('series' in changes) {
      this.chartOptions.series = this.series;
    }

    if ('categories' in changes) {
      this.chartOptions.labels = this.categories;
    }

    if ('legend' in changes) {
      this.chartOptions.legend = this.legend;
    }
  }

  async setData(series: ApexNonAxisChartSeries, categories: string[]) {
    this.loader = true;
    this.chartOptions.labels = categories;
    this.chartOptions.series = series;
    this.loader = false;
    // while (!this.chart) {
    //   await new Promise(resolve => setTimeout(resolve, 100));
    // }

    // this.chart.updateOptions(this.chartOptions);
  }
}
