import { DecimalPipe } from '@angular/common';
import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { ApexOptions, ChartComponent } from 'ng-apexcharts';

@Component({
  selector: 'four-type-search',
  standalone: false,
  templateUrl: './four-type-search.component.html',
  styleUrl: './four-type-search.component.scss'
})
export class FourTypeSearchComponent {
  @ViewChild("chart") chart: ChartComponent;
  @Input() colors: string[] = ['#6ce5e8', '#6ce5e8', '#6ce5e8', '#6ce5e8'];
  @Input() series: ApexAxisChartSeries = [];
  @Input() evaluatorCountSeries: number[] = [];
  @Input() evaluatorTotalSeries: number[] = [];
  @Input() categories: string[] = ['ร้อยละของผู้ตอบแบบสอบถาม งานบริการสถานีตำรวจ', 'ร้อยละของผู้ตอบแบบสอบถาม งานสืบสวนสอบสวน', 'ร้อยละของผู้ตอบแบบสอบถาม งานป้องกันและปราบปรามอาญชญากรรม', 'ร้อยละของผู้ตอบแบบสอบถาม งานจราจร', 'ร้อยละของผู้ตอบแบบสอบถาม ความพึงพอใจ'];

  chartOptions: ApexOptions;
  loader: boolean = true;


  constructor(private decimalPipe: DecimalPipe) {
    let th = this;
    this.chartOptions = {
      series: [
      ],
      chart: {
        type: "bar",
        height: 500,
        toolbar: {
          show: false
        },
        offsetX: 0,
        offsetY: 0
      },
      // grid: {
      //   padding: {
      //     right: 30 // adjust as needed
      //   }
      // },
      plotOptions: {
        bar: {
          columnWidth: "40%",
          distributed: true,
          dataLabels: {
            position: "center" // top, center, bottom
          }
        }
      },
      colors: ['#6ce5e8', '#6ce5e8', '#6ce5e8', '#6ce5e8'],
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
          // val = th.decimalPipe.transform(val.toString(), '1.0-2') || '0';
          val = Number(val);
          if (val >= 100) {
            return "100%";
          } else {
            return val + "%";
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
        categories: [],
        labels: {
          rotate: -45,
          trim: true,
          style: {
            colors: '#ffffff'
          }

        },
      },
      yaxis: {
        min: 0,
        max: 100,
        // labels: {
        //   formatter: function (val, opts) {
        //     let label = val?.toString();
        //     label = `${th.decimalPipe.transform(label ?? '0', '1.0-2')} / ${th.decimalPipe.transform(th.totalSeries[opts.dataPointIndex]?.toString() ?? '0', '1.0-2')}`;
        //     return label + " คน";
        //   },
        // }
        labels: {
          style: {
            colors: '#ffffff',
          },
          formatter: function (val, opts) {
            return val + "%";
          },
        }
      },
      tooltip: {
        y: {
          formatter: function (val, opts) {
            let label = val?.toString();
            label = `${th.decimalPipe.transform(th.evaluatorCountSeries[opts.dataPointIndex] ?? '0', '1.0-2')} / ${th.decimalPipe.transform(th.evaluatorTotalSeries[opts.dataPointIndex] ?? '0', '1.0-2')}`;
            return label + " คน";
          },
        }
      },
      legend: {
        position: 'top',
        labels: {
          colors: '#ffffff'
        }
      },
      fill: {
        opacity: 1
      },

      responsive: [
        // {
        //   breakpoint: 480,
        //   options: {
        //     legend: {
        //       position: "bottom",
        //       offsetX: -10,
        //       offsetY: 0
        //     }
        //   }
        // }
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

    this.loader = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('series' in changes) {
      this.chartOptions.series = this.series;
    }

    if ('colors' in changes) {
      this.chartOptions.colors = this.colors;
    }

    if ('categories' in changes) {
      console.log('this.categories', this.categories);
      this.chartOptions.xaxis.categories = this.categories;
    }
  }

}
