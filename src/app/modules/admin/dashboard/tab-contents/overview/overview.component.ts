import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { StackColumnWidgetComponent } from '../../../../shares/commons/stack-column-widget/stack-column-widget.component';
import { EvaluatorsAmountWidgetComponent } from '../../../../shares/commons/evaluators-amount-widget/evaluators-amount-widget.component';
import { EvaluationTotalWidgetComponent } from '../../../../shares/commons/evaluation-total-widget/evaluation-total-widget.component';
import { EvaluationScoreWidgetComponent } from '../../../../shares/commons/evaluation-score-widget/evaluation-score-widget.component';
import { DashboardResModel } from '../../../../shares/models/respone/dashboard-res.model';
import { AdminService } from '../../../../shares/services/admin.service';
import { DashboardReqModel } from '../../../../shares/models/request/dashboard-req.model';


@Component({
  selector: 'overview',
  standalone: false,
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent implements OnInit, OnChanges {
  @ViewChild("stackCol") stackCol: StackColumnWidgetComponent
  @ViewChild("evAmo") evAmo: EvaluatorsAmountWidgetComponent
  @ViewChild("evTo") evTo: EvaluationTotalWidgetComponent
  @ViewChild("evSco") evSco: EvaluationScoreWidgetComponent

  @Input() years: string;

  data: DashboardResModel[];

  constructor(private _service: AdminService) {

  }

  async ngOnChanges(changes: SimpleChanges){
    if('years' in changes){
      await this.initDashBoard();
    }
  }

  async ngOnInit() {
  //  await this.initDashBoard();
  }

  async initDashBoard() {
    let dash: DashboardReqModel = {
      head_org: [],
      years: this.years
    };

    try {
      this.data = await this._service.getDashboard(dash);

      if (!!this.data) {
        let evaluatorsTotal = this.data.reduce((sum, item) => sum + item.evaluators_total, 0);
        let evaluatorsCount = this.data.reduce((sum, item) => sum + item.evaluators_count, 0);
        let headOrgUnit = this.data.map(o => o.org_unit_name);
        let evaluatorsCountOfOrg = this.data.map(o => o.evaluators_count);
        let unevaluatorsCountOfOrg = this.data.map(o => o.unevaluators_count);
        let scoreTotalOfOrg = this.data.map(o => o.score_total);

        let seriesStackCol: ApexAxisChartSeries = [{
          name: "จำนวนที่ตอบแล้ว",
          data: evaluatorsCountOfOrg
        },
        {
          name: "จำนวนที่ยังไม่ตอบ",
          data: unevaluatorsCountOfOrg
        },];

        let seriesEvTo: ApexNonAxisChartSeries = [evaluatorsCount, unevaluatorsCountOfOrg.reduce((sum, item) => sum + item, 0)];
        let categoriesEvTo: string[] = ['ดำเนินการแล้ว', 'ยังไม่ได้ดำเนินการ'];
        let seriesCol: ApexAxisChartSeries = [{
          name: "คะแนนประเมิน",
          data: scoreTotalOfOrg,
        }];

        this.evAmo.setData({
          evaluatorsTotal: evaluatorsTotal,
          evaluatorsCount: evaluatorsCount,
          evluationDate: this.data[0].evaluation_date
        });
        this.stackCol.setData(seriesStackCol, headOrgUnit);
        this.evTo.setData(seriesEvTo, categoriesEvTo);
        this.evSco.setData(seriesCol, headOrgUnit);
      }
    } catch (ex) {
      this.evAmo.setData({
        evaluatorsTotal: 0,
        evaluatorsCount: 0,
        evluationDate: ''
      });
      this.stackCol.setData([], []);
      this.evTo.setData([], []);
      this.evSco.setData([], []);
    }
  }
}
