import { Component, Input } from '@angular/core';

@Component({
  selector: 'evaluators-amount-widget',
  standalone: false,
  templateUrl: './evaluators-amount-widget.component.html',
  styleUrl: './evaluators-amount-widget.component.scss'
})
export class EvaluatorsAmountWidgetComponent {
  @Input() title:string;
  @Input() evaluatorsTotal:number;
  @Input() evaluatorsCount:number;
  @Input() evluationDate:string;

  data:any;

  loader:boolean = true;

  setData(data){
    this.loader = true;
    this.data = data;
    this.loader = false;
  }
}
