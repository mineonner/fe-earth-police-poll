import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../shares/services/client.service';
import { OrgUnitEvaClientResModel } from '../../shares/models/respone/org-unit-eva-client-res.model';
import { FilterDashboardReqModel } from '../../shares/models/request/filter-dashboard-req.model';
import { SearchEvaluationProgressResModel } from '../../shares/models/respone/search-evaluation-progress-res.model';
import { UserResModel } from '../../shares/models/respone/user-res.model';
import { AuthService } from '../../shares/services/auth.service';
import { ApexOptions } from 'apexcharts';
import { DecimalPipe } from '@angular/common';
import { MUtilsService } from '../../../../core/services/util.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: false
})
export class HomeComponent implements OnInit {
  dataOrgUnitEvaluation: OrgUnitEvaClientResModel;
  dataEvaluationProgress: SearchEvaluationProgressResModel;
  filter: FilterDashboardReqModel = {
    bch_org_unit: '',
    bk_org_unit: '',
    kk_org_unit: '',
    org_unit: '',
    evaluation_years: (new Date().getFullYear() + 543).toString()
  };
  percentSeriesFilterOrg: ApexAxisChartSeries = [];
  evaluatorCountSeriesFilterOrg: number[] = [];
  evaluatorTotalSeriesFilterOrg: number[] = [];
  percentColorFourFilterOrg: string[] = [];
  categoriesSeriesFilterOrg: string[] = [];
  isShowFourTypeScore: boolean = false;

  accessToken: string;

  chartOptions: ApexOptions;

  constructor(private _service: ClientService,
    private authService: AuthService,
    private decimalPipe: DecimalPipe,
    private _util: MUtilsService
  ) {
    this.accessToken = this.authService.accessToken;

    this.initChart()
  }

  async ngOnInit() {
      this._service.getOrgUnitEvaluation((new Date().getFullYear() + 543).toString()).then(o => {
        this.dataOrgUnitEvaluation = o;
      });
      let res = await this._service.getPolicePoll();
      console.log('getPolicePoll', res);
      await this.onFilterChange(this.filter);
  }

  async onFilterChange(obj: FilterDashboardReqModel) {
    this.filter = obj;
    this.dataEvaluationProgress = await this._service.searchEvaluationProgress(obj);

    this.isShowFourTypeScore = (!!this.filter.bch_org_unit || !!this.filter.bk_org_unit || !!this.filter.kk_org_unit || !!this.filter.org_unit) ? true : false;

    if (this.isShowFourTypeScore) {
      this.evaluatorCountSeriesFilterOrg = [];
      this.evaluatorTotalSeriesFilterOrg = [];
      this.percentSeriesFilterOrg = [
        {
          name: "จำนวนผู้ตอบแบบสอบถาม",
          data: []
        }
      ];
      let percentData: number[] = [];
      this.percentColorFourFilterOrg = [];
      this.categoriesSeriesFilterOrg = [];

      let service: number = parseFloat(((this.dataEvaluationProgress.service_work_count / this.dataEvaluationProgress.service_work_total) * 100).toFixed(2));
      let investigative: number = parseFloat(((this.dataEvaluationProgress.investigative_work_count / this.dataEvaluationProgress.investigative_work_total) * 100).toFixed(2));
      let crimePrevention: number = parseFloat(((this.dataEvaluationProgress.crime_prevention_work_count / this.dataEvaluationProgress.crime_prevention_work_total) * 100).toFixed(2));
      let traffic: number = parseFloat(((this.dataEvaluationProgress.traffic_work_count / this.dataEvaluationProgress.traffic_work_total) * 100).toFixed(2));
      let satisfaction: number = parseFloat(((this.dataEvaluationProgress.satisfaction_count / this.dataEvaluationProgress.satisfaction_total) * 100).toFixed(2));

      if (this.dataEvaluationProgress.service_work_total > 0) {
        this.evaluatorCountSeriesFilterOrg.push(this.dataEvaluationProgress.service_work_count);
        this.evaluatorTotalSeriesFilterOrg.push(this.dataEvaluationProgress.service_work_total);
        percentData.push(service >= 100 ? 100 : service);
        this.percentColorFourFilterOrg.push(service >= 100 ? '#01cadc' : '#ffb000');
        this.categoriesSeriesFilterOrg.push('งานบริการสถานีตำรวจ');
      }

      if (this.dataEvaluationProgress.investigative_work_total > 0) {
        this.evaluatorCountSeriesFilterOrg.push(this.dataEvaluationProgress.investigative_work_count);
        this.evaluatorTotalSeriesFilterOrg.push(this.dataEvaluationProgress.investigative_work_total);
        percentData.push(investigative >= 100 ? 100 : investigative);
        this.percentColorFourFilterOrg.push(investigative >= 100 ? '#48c3fc' : '#ffb000');
        this.categoriesSeriesFilterOrg.push('งานสืบสวนสอบสวน');
      }

      if (this.dataEvaluationProgress.crime_prevention_work_total > 0) {
        this.evaluatorCountSeriesFilterOrg.push(this.dataEvaluationProgress.crime_prevention_work_count);
        this.evaluatorTotalSeriesFilterOrg.push(this.dataEvaluationProgress.crime_prevention_work_total);
        percentData.push(crimePrevention >= 100 ? 100 : crimePrevention);
        this.percentColorFourFilterOrg.push(crimePrevention >= 100 ? '#65a6fa' : '#ffb000');
        this.categoriesSeriesFilterOrg.push('งานป้องกันและปราบปรามอาญชญากรรม');
      }

      if (this.dataEvaluationProgress.traffic_work_total > 0) {
        this.evaluatorCountSeriesFilterOrg.push(this.dataEvaluationProgress.traffic_work_count);
        this.evaluatorTotalSeriesFilterOrg.push(this.dataEvaluationProgress.traffic_work_total);
        percentData.push(traffic >= 100 ? 100 : traffic);
        this.percentColorFourFilterOrg.push(traffic >= 100 ? '#afb1fe' : '#ffb000');
        this.categoriesSeriesFilterOrg.push('งานจราจร');
      }

      if (this.dataEvaluationProgress.satisfaction_total > 0 &&
        this.dataEvaluationProgress.service_work_total == 0 &&
        this.dataEvaluationProgress.investigative_work_total == 0 &&
        this.dataEvaluationProgress.crime_prevention_work_total == 0 &&
        this.dataEvaluationProgress.traffic_work_total == 0) {
        this.evaluatorCountSeriesFilterOrg.push(this.dataEvaluationProgress.satisfaction_count);
        this.evaluatorTotalSeriesFilterOrg.push(this.dataEvaluationProgress.satisfaction_total);
        percentData.push(satisfaction >= 100 ? 100 : satisfaction);
        this.percentColorFourFilterOrg.push(satisfaction >= 100 ? '#f9b6bf' : '#ffb000');
        this.categoriesSeriesFilterOrg.push('จำนวนผู้ตอบแบบสอบถาม');
      }

      this.percentSeriesFilterOrg[0].data = percentData;

      this.initChart();

    } else {
      this.evaluatorCountSeriesFilterOrg = [];
      this.evaluatorTotalSeriesFilterOrg = [];
      this.percentSeriesFilterOrg = [];
      this.percentColorFourFilterOrg = [];
      this.isShowFourTypeScore = false;
    }
  }

  initChart(){
    let th = this;

     this.chartOptions = {
      series: this.percentSeriesFilterOrg,
      chart: {
        type: "bar",
        height: 500,
        toolbar: {
          show: false
        },
        offsetX: 0,
        offsetY: 0
      },
      plotOptions: {
        bar: {
          columnWidth: "40%",
          distributed: true,
          dataLabels: {
            position: "center"
          },
          borderRadius: 15,
          borderRadiusApplication : 'end'
        }
      },
      colors: this.percentColorFourFilterOrg,
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
          val = Number(val);
          if (val >= 100) {
            return "100%";
          } else {
            return val + "%";
          }
        },

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
        categories: this.categoriesSeriesFilterOrg,
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
            label = `${th.decimalPipe.transform(th.evaluatorCountSeriesFilterOrg[opts.dataPointIndex] ?? '0', '1.0-2')} / ${th.decimalPipe.transform(th.evaluatorTotalSeriesFilterOrg[opts.dataPointIndex] ?? '0', '1.0-2')}`;
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

    this.chartOptions = {...this.chartOptions};
  }
}
