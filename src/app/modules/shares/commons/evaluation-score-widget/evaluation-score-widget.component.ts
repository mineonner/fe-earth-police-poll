import { Component } from '@angular/core';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  colors: string[];
  responsive: ApexResponsive[];
  noData: ApexNoData;
};

@Component({
  selector: 'evaluation-score-widget',
  standalone: false,
  templateUrl: './evaluation-score-widget.component.html',
  styleUrl: './evaluation-score-widget.component.scss'
})
export class EvaluationScoreWidgetComponent {
  chartOptions: Partial<ChartOptions>;
  loader: boolean = true;
  constructor() {
    this.chartOptions = {
      series: [],
      chart: {
        type: "bar",
        height: 400,
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
      colors: ['#66dd66'],
      dataLabels: {
        enabled: true,
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: []
      },
      yaxis: {
        min: 0,
        max: 5,
        labels: {
          formatter: function (val, opts) {
            return val.toString();
          },
        }
      },
      legend: {
        position: 'top'
      },
      fill: {
        opacity: 1
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

  setData(series: ApexAxisChartSeries, categories: string[]) {
    this.loader = true;
    this.chartOptions.xaxis.categories = categories;
    this.chartOptions.series = series;
    this.loader = false;
  }
}
