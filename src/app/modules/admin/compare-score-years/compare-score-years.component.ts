import { Component } from '@angular/core';
import { FilterDashboardReqModel } from '../../shares/models/request/filter-dashboard-req.model';
import { AdminService } from '../../shares/services/admin.service';
import { MUtilsService } from '../../../../core/services/util.service';
import { AlertService } from '../../../../core/services/alert.service';
import { ApexOptions } from 'apexcharts';
import { OrgUnitMasterListResModel } from '../../shares/models/respone/org-unit-master-list-res.model';
import { BaseOptionDropdownModel } from '../../../../core/models/BaseOptionDropdown.model';

@Component({
  selector: 'compare-score-years',
  standalone: false,
  templateUrl: './compare-score-years.component.html',
  styleUrl: './compare-score-years.component.scss'
})
export class CompareScoreYearsComponent {
  chartLineOptions: ApexOptions;
  chartColumnOptions: ApexOptions;
  isShowLineChart: boolean = false;
  isShowColumnChart: boolean = false;
  filter: FilterDashboardReqModel = {
    bch_org_unit: "",
    bch_org_unit_name: "",
    bk_org_unit: "",
    bk_org_unit_name: "",
    kk_org_unit: "",
    kk_org_unit_name: "",
    org_unit: "",
    org_unit_name: "",
    evaluation_years: "",
    compare_evaluation_years: ""
  }
  yearsOption:BaseOptionDropdownModel[] = [];

  constructor(private _service: AdminService
    , private _util: MUtilsService
    , private _alert: AlertService
  ) {
    this.chartLineOptions = {
      series: [
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      colors: ['#ff5757', '#6ce5e8'],
      xaxis: {
        categories: [
          "งานบริการ",
          "งานสืบสวนสอบสวน",
          "งานป้องกันและปราบปรามอาญชญากรรม",
          "งานจราจร",
          "ผลคะแนนรวม",
        ],
        labels: {
          style: {
            fontSize: '15px'
          },
          rotate: 90,
          trim: false
        },
      },
      yaxis: {
        min: 0,
        max: 5,
      },
      markers: {
        size: 6,
        hover: {
          size: 8
        }
      },
      dataLabels: {
        enabled: true,
        offsetY: -10,
      },
      legend: {
        position: 'top'
      }
    };

    this.chartColumnOptions = {
      series: [
        // {
        //   name: "คะแนน",
        //   data: [2, 4]
        // },
      ],
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          distributed: true,
        }
      },
      colors: ['#ff5757', '#6ce5e8'],
      xaxis: {
        categories: [],
      },
      yaxis: {
        min: 0,
        max: 5,
      },
      legend: {
        position: 'top'
      }
    }
  }

  async ngOnInit() {
    await this.getYearsOption();
  }

  async onFilterChange(obj: FilterDashboardReqModel) {
    obj.compare_evaluation_years = this.filter.compare_evaluation_years;
    obj.evaluation_years = this.filter.evaluation_years;
    this.filter = obj;
    await this.searchDashboardScoreCompareYears(obj);
  }

  async searchDashboardScoreCompareYears(body: FilterDashboardReqModel) {
    try {
      this.isShowLineChart = false;
      this.isShowColumnChart = false;
      if (!!body.bch_org_unit || !!body.bk_org_unit || !!body.kk_org_unit || !!body.org_unit) {
        let result: OrgUnitMasterListResModel[] = await this._service.searchDashboardScoreCompareYears(body);
        this.initChart(result);
      }
    } catch (ex) {
      console.error('searchDashboardScoreCompareYears', ex);
    }
  }

  async initChart(data: OrgUnitMasterListResModel[]) {
    let series: ApexAxisChartSeries = [];
    let seriesCat: number[] = [];
    let columnCat: string[] = [];



    await data.map(o => {
      let sDa = {
        name: o.evaluation_year,
        data: [o.service_work_score, o.investigative_work_score, o.crime_prevention_work_score, o.traffic_work_score, o.average_total_score]
      };
      series.push(sDa);
      columnCat.push(`ผลการประเมิน ${o.evaluation_year}`);
      seriesCat.push(o.satisfaction_score);
    });

    this.chartLineOptions.series = series;
    this.chartColumnOptions.xaxis.categories = columnCat;
    this.chartColumnOptions.series = [{
      name: "คะแนนประเมิน",
      data: seriesCat
    },];


    this.chartColumnOptions = {...this.chartColumnOptions};

    if (data.reduce((sum, obj) => sum + (obj.service_work_total + obj.investigative_work_total
      + obj.crime_prevention_work_total + obj.traffic_work_total), 0) > 0) this.isShowLineChart = true;

    if (data.reduce((sum, obj) => sum + obj.satisfaction_total, 0) > 0) this.isShowColumnChart = true;
  }

  private getYearsOption(): void {
    const currentCeYear = new Date().getFullYear();
    const currentBeYear = currentCeYear + 543; // แปลง ค.ศ. เป็น พ.ศ.
    this.filter.evaluation_years = currentBeYear.toString();
    this.filter.compare_evaluation_years = (currentBeYear - 1).toString();
    this.yearsOption = [];
    for (let i = 0; i <= 5; i++) {
      const year = (currentBeYear - i).toString();
      this.yearsOption.push({ id: year, name: year });
    }
  }

}
