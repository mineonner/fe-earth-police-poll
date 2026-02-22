import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
  noData: ApexNoData;
  colors: string[];
};

@Component({
  selector: 'stack-column-widget',
  standalone: false,
  templateUrl: './stack-column-widget.component.html',
  styleUrl: './stack-column-widget.component.scss'
})
export class StackColumnWidgetComponent implements OnInit, OnChanges {
  @ViewChild("chart") chart: ChartComponent;
  chartOptions: Partial<ChartOptions>;

  loader: boolean = true;

  constructor() {
    this.chartOptions = {
      series: [],
      chart: {
        type: "bar",
        height: 400,
        stacked: true,
        stackType: "100%",
        toolbar: {
          export: {
            csv: {
              filename: new Date().toISOString().split('T')[0],
              headerCategory: 'หน่วยงาน',
            }
          }
        }
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top"
          }
        }
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      colors: ['#66dd66', '#cf4547'],
      xaxis: {
        categories: [],

      },
      fill: {
        opacity: 1
      },
      legend: {
        position: "top",
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

  async ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  async setData(series: ApexAxisChartSeries, categories: string[]) {
    this.loader = true;
    this.chartOptions.xaxis.categories = categories;
    this.chartOptions.series = series;
    this.loader = false;
    // while (!this.chart) {
    //   await new Promise(resolve => setTimeout(resolve, 100));
    // }

    // this.chart.updateOptions(this.chartOptions);
  }
}
