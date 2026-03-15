import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { EvaluatorsAmountWidgetComponent } from '../../../../shares/commons/evaluators-amount-widget/evaluators-amount-widget.component';
import { EvaluationTotalWidgetComponent } from '../../../../shares/commons/evaluation-total-widget/evaluation-total-widget.component';
import { FourScoreTypeWidgetComponent } from '../../../../shares/commons/four-score-type-widget/four-score-type-widget.component';
import { ScoreGaugeChartWidgetComponent } from '../../../../shares/commons/score-gauge-chart-widget/score-gauge-chart-widget.component';
import { DashboardResModel } from '../../../../shares/models/respone/dashboard-res.model';
import { FilterDashboardResModel } from '../../../../shares/models/respone/filter-dashboard-res.model';
import { FilterDashboardReqModel } from '../../../../shares/models/request/filter-dashboard-req.model';
import { AdminService } from '../../../../shares/services/admin.service';
import { DashboardReqModel } from '../../../../shares/models/request/dashboard-req.model';
// import { EvaluatorsAmountWidgetComponent } from '../../../shares/commons/evaluators-amount-widget/evaluators-amount-widget.component';
// import { EvaluationTotalWidgetComponent } from '../../../shares/commons/evaluation-total-widget/evaluation-total-widget.component';
// import { DashboardResModel } from '../../../shares/models/respone/dashboard-res.model';
// import { AdminService } from '../../../shares/services/admin.service';
// import { DashboardReqModel } from '../../../shares/models/request/dashboard-req.model';
// import { FourScoreTypeWidgetComponent } from '../../../shares/commons/four-score-type-widget/four-score-type-widget.component';
// import { ScoreGaugeChartWidgetComponent } from '../../../shares/commons/score-gauge-chart-widget/score-gauge-chart-widget.component';
// import { FilterDashboardReqModel } from '../../../shares/models/request/filter-dashboard-req.model';
// import { FilterDashboardResModel } from '../../../shares/models/respone/filter-dashboard-res.model';

@Component({
  selector: 'tourist-police-headquarters',
  standalone: false,
  templateUrl: './tourist-police-headquarters.component.html',
  styleUrl: './tourist-police-headquarters.component.scss'
})
export class TouristPoliceHeadquartersComponent {
  @ViewChild("evAmo") evAmo: EvaluatorsAmountWidgetComponent;
  @ViewChild("evTo") evTo: EvaluationTotalWidgetComponent;
  @ViewChild("four") four: FourScoreTypeWidgetComponent;
  @ViewChild("scoGauge") scoGauge: ScoreGaugeChartWidgetComponent;

  @Input() years:string;

  data: DashboardResModel[];
  orgUnitCodes: string[] = ['BCH12'];
  categoriesEvTo: string[] = ['ดำเนินการแล้ว', 'ยังไม่ได้ดำเนินการ'];

  loader: boolean = false;
  loaderFilter: boolean = false;
  filterData: FilterDashboardResModel;
  filter: FilterDashboardReqModel;
  seriesBCH: ApexNonAxisChartSeries = [];
  seriesBK: ApexNonAxisChartSeries = [];
  seriesKK: ApexNonAxisChartSeries = [];
  seriesOrg: ApexNonAxisChartSeries = [];
  seriesFourFilterOrg: ApexAxisChartSeries = [];
  averageScore: number;


  constructor(private _service: AdminService) {

  }

  async ngOnChanges(changes: SimpleChanges) {
    if ('years' in changes) {
      await this.initDashBoard();
    }
  }

  async initDashBoard() {
    this.loader = true;
    let dash: DashboardReqModel = {
      head_org: this.orgUnitCodes,
      years: this.years
    }
    let evaluatorsTotal = 0;
    let evaluatorsCount = 0;
    let unevaluatorsCountOfOrg = [];
    let seriesEvTo: ApexNonAxisChartSeries = [];
    let evaluationDate: string;

    try {
      this.data = await this._service.getDashboard(dash);
      this.loader = false;
      if (!!this.data) {
        evaluatorsTotal = this.data.reduce((sum, item) => sum + item.evaluators_total, 0);
        evaluatorsCount = this.data.reduce((sum, item) => sum + item.evaluators_count, 0);
        unevaluatorsCountOfOrg = this.data.map(o => o.unevaluators_count);
        evaluationDate = this.data[0].evaluation_date;

        seriesEvTo = [evaluatorsCount, unevaluatorsCountOfOrg.reduce((sum, item) => sum + item, 0)];

        this.averageScore = this.data.reduce((sum, item) => sum + item.score_total, 0) / this.data.length;
      }
    } catch (ex) {

    }

    while (!this.evAmo || !this.evTo || !this.scoGauge) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    this.evAmo.setData({
      evaluatorsTotal: evaluatorsTotal,
      evaluatorsCount: evaluatorsCount,
      evluationDate: evaluationDate
    });
    this.evTo.setData(seriesEvTo, this.categoriesEvTo);
    this.scoGauge.setData(this.averageScore);
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
    this.loaderFilter = false;
  }
}
