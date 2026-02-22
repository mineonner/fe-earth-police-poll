import { DecimalPipe } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';

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
  selector: 'four-score-type-widget',
  standalone: false,
  templateUrl: './four-score-type-widget.component.html',
  styleUrl: './four-score-type-widget.component.scss'
})
export class FourScoreTypeWidgetComponent implements OnChanges {
  @Input() series: ApexAxisChartSeries = [];
  @Input() totalSeries: any[] = [];
  @Input() satisfactionScore: number = 0;

  chartOptions: Partial<ChartOptions>;
  @Input() loader: boolean = true;
  @Input() isShowAverageScore: boolean = true;
  @Input() isShowFourTypeScore: boolean = true;
  @Input() fontColor: string = '#000000';

  @ViewChild('chart') chart: ChartComponent;

  constructor(private decimalPipe: DecimalPipe) {
    let th = this;
    this.chartOptions = {
      series: [],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          distributed: true,
          dataLabels: {
            position: "center" // top, center, bottom
          }
        }
      },
      colors: ['#6ce5e8', '#41b8d5', '#2d8bba', '#2f5f98'],
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
          // val = th.decimalPipe.transform(val.toString(), '1.0-2') || '0';
          val = (Number(val) / (th.totalSeries[opts.dataPointIndex] ?? 0)) * 100;
          if (val >= 100) {
            return "100%";
          } else {
            return val.toFixed(2) + "%";
          }

        },
        // offsetY: -20,
        style: {
          fontSize: "1.2rem",
          colors: ["#040a66"]
        }
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: ['งานบริการสถานีตำรวจ', 'งานสืบสวนสอบสวน', 'งานป้องกันและปราบปรามอาญชญากรรม', 'งานจราจร'],
        labels: {
          style: {
            colors: this.fontColor
          }
        }
      },
      yaxis: {
        // min: 0,
        // max: 5,
        // labels: {
        //   formatter: function (val, opts) {
        //     let label = val?.toString();
        //     label = `${th.decimalPipe.transform(label ?? '0', '1.0-2')} / ${th.decimalPipe.transform(th.totalSeries[opts.dataPointIndex]?.toString() ?? '0', '1.0-2')}`;
        //     return label + " คน";
        //   },
        // }
        labels: {
          style: {
            colors: this.fontColor
          }
        }
      },
      tooltip: {
        y: {
          formatter: function (val, opts) {
            let label = val?.toString();
            label = `${th.decimalPipe.transform(label ?? '0', '1.0-2')} / ${th.decimalPipe.transform(th.totalSeries[opts.dataPointIndex]?.toString() ?? '0', '1.0-2')}`;
            return label + " คน";
          },
        }
      },
      legend: {
        position: 'top',
        labels: {
          colors: this.fontColor
        }
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

  ngOnChanges(changes: SimpleChanges): void {
    if ('series' in changes) {
      this.chartOptions.series = this.series;
    }

    if ('fontColor' in changes) {
      console.log(this.fontColor);
      this.chartOptions.xaxis.labels.style.colors = this.fontColor;
      this.chartOptions.yaxis.labels.style.colors = this.fontColor;
      this.chartOptions.legend.labels.colors = this.fontColor;
      // this.chart.updateOptions(this.chartOptions);
    }
  }

  setData(series: ApexAxisChartSeries, satisfactionScore: number, totalSeries: any[] = []) {
    this.loader = true;
    this.chartOptions.series = series;
    this.satisfactionScore = satisfactionScore;
    this.totalSeries = totalSeries;
    this.loader = false;
  }
}
