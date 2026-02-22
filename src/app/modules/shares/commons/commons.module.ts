import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { StackColumnWidgetComponent } from './stack-column-widget/stack-column-widget.component';
import { EvaluationTotalWidgetComponent } from './evaluation-total-widget/evaluation-total-widget.component';
import { EvaluatorsAmountWidgetComponent } from './evaluators-amount-widget/evaluators-amount-widget.component';
import { EvaluationScoreWidgetComponent } from './evaluation-score-widget/evaluation-score-widget.component';
import { ControlsModule } from '../../../../core/controls/controls.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FourScoreTypeWidgetComponent } from './four-score-type-widget/four-score-type-widget.component';
import { ScoreGaugeChartWidgetComponent } from './score-gauge-chart-widget/score-gauge-chart-widget.component';
import { FilterOrgUnitComponent } from './filter-org-unit/filter-org-unit.component';
import { OrgUnitScoreTableComponent } from './org-unit-score-table/org-unit-score-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { FourTypeSearchComponent } from './four-type-search/four-type-search.component';
import { ChartWidgetComponent } from './chart-widget/chart-widget.component';

const commons = [
  StackColumnWidgetComponent,
  EvaluationTotalWidgetComponent,
  EvaluatorsAmountWidgetComponent,
  EvaluationScoreWidgetComponent,
  FourScoreTypeWidgetComponent,
  ScoreGaugeChartWidgetComponent,
  FilterOrgUnitComponent,
  OrgUnitScoreTableComponent,
  FourTypeSearchComponent,
  ChartWidgetComponent
]

@NgModule({
  declarations: [
    ...commons,
  ],
  imports: [
    CommonModule,
    ControlsModule,
    NgApexchartsModule,
    MatTableModule,
    MatSortModule
  ],
  exports: [
    ...commons
  ],
  providers: [
    DecimalPipe
  ]
})
export class CommonsModule { }
