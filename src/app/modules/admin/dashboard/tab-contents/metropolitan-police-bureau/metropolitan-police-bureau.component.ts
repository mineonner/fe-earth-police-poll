import { Component, OnInit, ViewChild } from '@angular/core';
import { EvaluatorsAmountWidgetComponent } from '../../../../shares/commons/evaluators-amount-widget/evaluators-amount-widget.component';
import { EvaluationTotalWidgetComponent } from '../../../../shares/commons/evaluation-total-widget/evaluation-total-widget.component';
import { FourScoreTypeWidgetComponent } from '../../../../shares/commons/four-score-type-widget/four-score-type-widget.component';
import { ScoreGaugeChartWidgetComponent } from '../../../../shares/commons/score-gauge-chart-widget/score-gauge-chart-widget.component';
import { DashboardResModel } from '../../../../shares/models/respone/dashboard-res.model';
import { FilterDashboardResModel } from '../../../../shares/models/respone/filter-dashboard-res.model';
import { FilterDashboardReqModel } from '../../../../shares/models/request/filter-dashboard-req.model';
import { AdminService } from '../../../../shares/services/admin.service';
import { DashboardReqModel } from '../../../../shares/models/request/dashboard-req.model';
import { ApexOptions } from 'apexcharts';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'metropolitan-police-bureau',
  templateUrl: './metropolitan-police-bureau.component.html',
  styleUrl: './metropolitan-police-bureau.component.scss',
  standalone: false
})
export class MetropolitanPoliceBureauComponent implements OnInit {
  @ViewChild("evAmo") evAmo: EvaluatorsAmountWidgetComponent;
  @ViewChild("evTo") evTo: EvaluationTotalWidgetComponent;
  @ViewChild("scoGauge") scoGauge: ScoreGaugeChartWidgetComponent;

  data: DashboardResModel[];
  filterData: FilterDashboardResModel;
  orgUnitCodes: string[] = ['BCH1', 'BCH2', 'BCH3', 'BCH4', 'BCH5', 'BCH6', 'BCH7', 'BCH8', 'BCH9', 'BCH10'];
  loader: boolean = false;
  loaderFilter: boolean = false;
  filter: FilterDashboardReqModel;
  chartFourScoreTypeBCHOptions: ApexOptions;
  chartFourScoreTypeFilterOptions: ApexOptions;

  categoriesEvTo: string[] = ['ดำเนินการแล้ว', 'ยังไม่ได้ดำเนินการ'];
  seriesBCH: ApexNonAxisChartSeries = [];
  seriesBK: ApexNonAxisChartSeries = [];
  seriesKK: ApexNonAxisChartSeries = [];
  seriesOrg: ApexNonAxisChartSeries = [];

  constructor(private _service: AdminService
    , private decimalPipe: DecimalPipe
  ) {

  }

  async ngOnInit() {
    this.loader = true;
    let dash: DashboardReqModel = {
      head_org: this.orgUnitCodes,
      years: '2568'
    }

    let evaluatorsTotal = 0;
    let evaluatorsCount = 0;
    let unevaluatorsCountOfOrg = [];
    let seriesEvTo: ApexNonAxisChartSeries = [];
    let evaluationDate: string;
    let satisfactionScore: number = 0;

    try {
      this.data = await this._service.getDashboard(dash);
      this.loader = false;
      console.log('this.data', this.data);
      if (!!this.data) {
        evaluatorsTotal = this.data.reduce((sum, item) => sum + item.evaluators_total, 0);
        evaluatorsCount = this.data.reduce((sum, item) => sum + item.evaluators_count, 0);
        unevaluatorsCountOfOrg = this.data.map(o => o.unevaluators_count);
        evaluationDate = this.data[0].evaluation_date;

        seriesEvTo = [evaluatorsCount, unevaluatorsCountOfOrg.reduce((sum, item) => sum + item, 0)];
        satisfactionScore = Math.round((this.data.reduce((sum, item) => sum + item.score_total, 0) / this.data.length) * 10) / 10;


      }
    } catch (ex) {

    }

    this.initChartFourScoreTypeBCH();

    while (!this.evAmo || !this.evTo || !this.scoGauge) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    this.evAmo.setData({
      evaluatorsTotal: evaluatorsTotal,
      evaluatorsCount: evaluatorsCount,
      evluationDate: evaluationDate
    });
    this.evTo.setData(seriesEvTo, this.categoriesEvTo);
    this.scoGauge.setData(satisfactionScore);
  }

  async onFilterChange(obj: FilterDashboardReqModel) {
    this.loaderFilter = true;
    this.filterData = null;
    this.filter = obj;
    this.filterData = await this._service.searchFilterDashboard(obj);
    this.seriesBCH = !!this.filterData.bch_org_unit ? [this.filterData.bch_org_unit.evaluators_count, this.filterData.bch_org_unit.unevaluators_count] : [];
    this.seriesBK = !!this.filterData.bk_org_unit ? [this.filterData.bk_org_unit.evaluators_count, this.filterData.bk_org_unit.unevaluators_count] : [];
    this.seriesKK = !!this.filterData.kk_org_unit ? [this.filterData.kk_org_unit.evaluators_count, this.filterData.kk_org_unit.unevaluators_count] : [];
    this.seriesOrg = !!this.filterData.org_unit ? [this.filterData.org_unit.evaluators_count, this.filterData.org_unit.unevaluators_count] : [];
    this.initChartFourScoreTypeFilter();
    this.loaderFilter = false;
  }

  initChartFourScoreTypeBCH() {
    let th = this;

    let percentSeries = [
      {
        name: "จำนวนผู้ตอบแบบสอบถาม",
        data: []
      }
    ];
    let percentData: number[] = [];
    let colorStyle: string[] = [];
    let categories: string[] = [];
    let evaluatorCount: number[] = [];
    let evaluatorTotal: number[] = [];

    let service: number = parseFloat((this.data.reduce((sum, item) => sum + item.service_work_count, 0) / (this.data.reduce((sum, item) => sum + item.service_work_total, 0)) * 100).toFixed(2));
    let investigative: number = parseFloat((this.data.reduce((sum, item) => sum + item.investigative_work_count, 0) / (this.data.reduce((sum, item) => sum + item.investigative_work_total, 0)) * 100).toFixed(2));
    let crimePrevention: number = parseFloat((this.data.reduce((sum, item) => sum + item.crime_prevention_work_count, 0) / (this.data.reduce((sum, item) => sum + item.crime_prevention_work_total, 0)) * 100).toFixed(2));
    let traffic: number = parseFloat((this.data.reduce((sum, item) => sum + item.traffic_work_count, 0) / (this.data.reduce((sum, item) => sum + item.traffic_work_total, 0)) * 100).toFixed(2));
    let satisfaction: number = parseFloat((this.data.reduce((sum, item) => sum + item.satisfaction_count, 0) / (this.data.reduce((sum, item) => sum + item.satisfaction_total, 0)) * 100).toFixed(2));

    if (this.data.reduce((sum, item) => sum + item.service_work_total, 0) > 0) {
      evaluatorCount.push(this.data.reduce((sum, item) => sum + item.service_work_count, 0));
      evaluatorTotal.push(this.data.reduce((sum, item) => sum + item.service_work_total, 0));
      percentData.push(service >= 100 ? 100 : service);
      colorStyle.push(service >= 100 ? '#01cadc' : '#ffb000');
      categories.push('งานบริการสถานีตำรวจ');
    }

    if (this.data.reduce((sum, item) => sum + item.investigative_work_total, 0) > 0) {
      evaluatorCount.push(this.data.reduce((sum, item) => sum + item.investigative_work_count, 0));
      evaluatorTotal.push(this.data.reduce((sum, item) => sum + item.investigative_work_total, 0));
      percentData.push(investigative >= 100 ? 100 : investigative);
      colorStyle.push(investigative >= 100 ? '#48c3fc' : '#ffb000');
      categories.push('งานสืบสวนสอบสวน');
    }

    if (this.data.reduce((sum, item) => sum + item.crime_prevention_work_total, 0) > 0) {
      evaluatorCount.push(this.data.reduce((sum, item) => sum + item.crime_prevention_work_count, 0));
      evaluatorTotal.push(this.data.reduce((sum, item) => sum + item.crime_prevention_work_total, 0));
      percentData.push(crimePrevention >= 100 ? 100 : crimePrevention);
      colorStyle.push(crimePrevention >= 100 ? '#65a6fa' : '#ffb000');
      categories.push('งานป้องกันและปราบปรามอาญชญากรรม');
    }

    if (this.data.reduce((sum, item) => sum + item.traffic_work_total, 0) > 0) {
      evaluatorCount.push(this.data.reduce((sum, item) => sum + item.traffic_work_count, 0));
      evaluatorTotal.push(this.data.reduce((sum, item) => sum + item.traffic_work_total, 0));
      percentData.push(traffic >= 100 ? 100 : traffic);
      colorStyle.push(traffic >= 100 ? '#afb1fe' : '#ffb000');
      categories.push('งานจราจร');
    }

    if (this.data.reduce((sum, item) => sum + item.satisfaction_total, 0) > 0) {
      evaluatorCount.push(this.data.reduce((sum, item) => sum + item.satisfaction_count, 0));
      evaluatorTotal.push(this.data.reduce((sum, item) => sum + item.satisfaction_total, 0));
      percentData.push(satisfaction >= 100 ? 100 : satisfaction);
      colorStyle.push(satisfaction >= 100 ? '#f9b6bf' : '#ffb000');
      categories.push('ความพึงพอใจ');
    }

    percentSeries[0].data = percentData;

    this.chartFourScoreTypeBCHOptions = {
      series: percentSeries,
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: false
        },
        offsetX: 0,
        offsetY: 0
      },
      plotOptions: {
        bar: {
          distributed: true,
          dataLabels: {
            position: "center"
          },
          borderRadius: 15,
          borderRadiusApplication: 'end'
        }
      },
      colors: colorStyle,
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
        categories: categories,
        labels: {
          rotate: -45,
          trim: true,
          style: {
            colors: '#000000'
          }

        },
      },
      yaxis: {
        min: 0,
        max: 100,
        labels: {
          style: {
            colors: '#000000',
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
            label = `${th.decimalPipe.transform(evaluatorCount[opts.dataPointIndex] ?? '0', '1.0-2')} / ${th.decimalPipe.transform(evaluatorTotal[opts.dataPointIndex] ?? '0', '1.0-2')}`;
            return label + " คน";
          },
        }
      },
      legend: {
        position: 'top',
        labels: {
          colors: '#000000'
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

    this.chartFourScoreTypeBCHOptions = { ...this.chartFourScoreTypeBCHOptions };
  }

  initChartFourScoreTypeFilter() {
    let th = this;

    let percentSeries = [
      {
        name: "จำนวนผู้ตอบแบบสอบถาม",
        data: []
      }
    ];
    let percentData: number[] = [];
    let colorStyle: string[] = [];
    let categories: string[] = [];
    let evaluatorCount: number[] = [];
    let evaluatorTotal: number[] = [];

    let service: number = parseFloat((this.data.reduce((sum, item) => sum + item.service_work_count, 0) / (this.data.reduce((sum, item) => sum + item.service_work_total, 0)) * 100).toFixed(2));
    let investigative: number = parseFloat((this.data.reduce((sum, item) => sum + item.investigative_work_count, 0) / (this.data.reduce((sum, item) => sum + item.investigative_work_total, 0)) * 100).toFixed(2));
    let crimePrevention: number = parseFloat((this.data.reduce((sum, item) => sum + item.crime_prevention_work_count, 0) / (this.data.reduce((sum, item) => sum + item.crime_prevention_work_total, 0)) * 100).toFixed(2));
    let traffic: number = parseFloat((this.data.reduce((sum, item) => sum + item.traffic_work_count, 0) / (this.data.reduce((sum, item) => sum + item.traffic_work_total, 0)) * 100).toFixed(2));
    let satisfaction: number = parseFloat((this.data.reduce((sum, item) => sum + item.satisfaction_count, 0) / (this.data.reduce((sum, item) => sum + item.satisfaction_total, 0)) * 100).toFixed(2));

    if (this.filterData.org_unit_evoluation_item_list.filter(o => o.is_evaluation).reduce((sum, item) => sum + item.service_work_total, 0) > 0) {
      evaluatorCount.push(this.filterData.org_unit_evoluation_item_list.filter(o => o.is_evaluation).reduce((sum, item) => sum + item.service_work_count, 0));
      evaluatorTotal.push(this.filterData.org_unit_evoluation_item_list.filter(o => o.is_evaluation).reduce((sum, item) => sum + item.service_work_total, 0));
      percentData.push(service >= 100 ? 100 : service);
      colorStyle.push(service >= 100 ? '#01cadc' : '#ffb000');
      categories.push('งานบริการสถานีตำรวจ');
    }

    if (this.filterData.org_unit_evoluation_item_list.filter(o => o.is_evaluation).reduce((sum, item) => sum + item.investigative_work_total, 0) > 0) {
      evaluatorCount.push(this.filterData.org_unit_evoluation_item_list.filter(o => o.is_evaluation).reduce((sum, item) => sum + item.investigative_work_count, 0));
      evaluatorTotal.push(this.filterData.org_unit_evoluation_item_list.filter(o => o.is_evaluation).reduce((sum, item) => sum + item.investigative_work_total, 0));
      percentData.push(investigative >= 100 ? 100 : investigative);
      colorStyle.push(investigative >= 100 ? '#48c3fc' : '#ffb000');
      categories.push('งานสืบสวนสอบสวน');
    }

    if (this.filterData.org_unit_evoluation_item_list.filter(o => o.is_evaluation).reduce((sum, item) => sum + item.crime_prevention_work_total, 0) > 0) {
      evaluatorCount.push(this.filterData.org_unit_evoluation_item_list.filter(o => o.is_evaluation).reduce((sum, item) => sum + item.crime_prevention_work_count, 0));
      evaluatorTotal.push(this.filterData.org_unit_evoluation_item_list.filter(o => o.is_evaluation).reduce((sum, item) => sum + item.crime_prevention_work_total, 0));
      percentData.push(crimePrevention >= 100 ? 100 : crimePrevention);
      colorStyle.push(crimePrevention >= 100 ? '#65a6fa' : '#ffb000');
      categories.push('งานป้องกันและปราบปรามอาญชญากรรม');
    }

    if (this.filterData.org_unit_evoluation_item_list.filter(o => o.is_evaluation).reduce((sum, item) => sum + item.traffic_work_total, 0) > 0) {
      evaluatorCount.push(this.filterData.org_unit_evoluation_item_list.filter(o => o.is_evaluation).reduce((sum, item) => sum + item.traffic_work_count, 0));
      evaluatorTotal.push(this.filterData.org_unit_evoluation_item_list.filter(o => o.is_evaluation).reduce((sum, item) => sum + item.traffic_work_total, 0));
      percentData.push(traffic >= 100 ? 100 : traffic);
      colorStyle.push(traffic >= 100 ? '#afb1fe' : '#ffb000');
      categories.push('งานจราจร');
    }

    if (this.filterData.org_unit_evoluation_item_list.filter(o => o.is_evaluation).reduce((sum, item) => sum + item.satisfaction_total, 0) > 0) {
      evaluatorCount.push(this.filterData.org_unit_evoluation_item_list.filter(o => o.is_evaluation).reduce((sum, item) => sum + item.satisfaction_count, 0));
      evaluatorTotal.push(this.filterData.org_unit_evoluation_item_list.filter(o => o.is_evaluation).reduce((sum, item) => sum + item.satisfaction_total, 0));
      percentData.push(satisfaction >= 100 ? 100 : satisfaction);
      colorStyle.push(satisfaction >= 100 ? '#f9b6bf' : '#ffb000');
      categories.push('ความพึงพอใจ');
    }

    percentSeries[0].data = percentData;

    this.chartFourScoreTypeFilterOptions = {
      series: percentSeries,
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: false
        },
        offsetX: 0,
        offsetY: 0
      },
      plotOptions: {
        bar: {
          distributed: true,
          dataLabels: {
            position: "center"
          },
          borderRadius: 15,
          borderRadiusApplication: 'end'
        }
      },
      colors: colorStyle,
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
        categories: categories,
        labels: {
          rotate: -45,
          trim: true,
          style: {
            colors: '#000000'
          }

        },
      },
      yaxis: {
        min: 0,
        max: 100,
        labels: {
          style: {
            colors: '#000000',
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
            label = `${th.decimalPipe.transform(evaluatorCount[opts.dataPointIndex] ?? '0', '1.0-2')} / ${th.decimalPipe.transform(evaluatorTotal[opts.dataPointIndex] ?? '0', '1.0-2')}`;
            return label + " คน";
          },
        }
      },
      legend: {
        position: 'top',
        labels: {
          colors: '#000000'
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

    this.chartFourScoreTypeFilterOptions = { ...this.chartFourScoreTypeFilterOptions };
  }
}
