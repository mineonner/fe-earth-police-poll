import { AfterViewInit, Component, Input } from '@angular/core';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5radar from "@amcharts/amcharts5/radar";

export interface ScoreRange {
  start:number;
  end:number;
}

@Component({
  selector: 'score-gauge-chart-widget',
  standalone: false,
  templateUrl: './score-gauge-chart-widget.component.html',
  styleUrl: './score-gauge-chart-widget.component.scss'
})
export class ScoreGaugeChartWidgetComponent implements AfterViewInit {
  @Input() comName:string = "score-gauge";
  axis: any
  handDataItem:any
  badScore:ScoreRange = {
    start:0,
    end: 3.81
  }
  normalScore:ScoreRange = {
    start:3.82,
    end: 3.93
  }
  goodScore:ScoreRange = {
    start:3.94,
    end: 5
  }
  satisfactionScore:number = 0;

  async ngAfterViewInit() {
    let root = am5.Root.new(this.comName);
    //  while (!root) {
    //   root = am5.Root.new(this.comName);
    //   await new Promise(resolve => setTimeout(resolve, 100));
    // }
    var chart = root.container.children.push(
      am5radar.RadarChart.new(root, {
        panX: false,
        panY: false,
        startAngle: -180,
        endAngle: 0,
        //innerRadius: -20
      })
    );

    var axisRenderer = am5radar.AxisRendererCircular.new(root, {
      strokeOpacity: 0.1,
      minGridDistance: 30
    });


    axisRenderer.ticks.template.setAll({
      visible: true,
      strokeOpacity: 0.5
    });

    axisRenderer.grid.template.setAll({
      visible: false
    });

    this.axis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0,
        min: 0,
        max: 5,
        strictMinMax: true,
        renderer: axisRenderer
      })
    );

    this.handDataItem = this.axis.makeDataItem({
      value: 0
    });

    let hand = this.handDataItem.set("bullet", am5xy.AxisBullet.new(root, {
      sprite: am5radar.ClockHand.new(root, {
        radius: am5.percent(99)
      })
    }));

    this.axis.createAxisRange(this.handDataItem);

    this.createRange(this.badScore.start, this.badScore.end, am5.color('#cf4547'), "ปรับปรุง");
    this.createRange(this.normalScore.start, this.normalScore.end, am5.color('#ffb000'), "พอใช้");
    this.createRange(this.goodScore.start, this.goodScore.end, am5.color('#66dd66'), "ดี");

  }

  createRange(start, end, color, label) {

    var rangeDataItem = this.axis.makeDataItem({
      value: start,
      endValue: end
    });

    var range = this.axis.createAxisRange(rangeDataItem);

    rangeDataItem.get("axisFill").setAll({
      visible: true,
      fill: color,
      fillOpacity: 1,
      innerRadius: -40
    });

    rangeDataItem.get("tick").setAll({
      visible: false
    });

    rangeDataItem.get("label").setAll({
      text: label,
      inside: true,
      radius: -40 / -2 - 5,
      fontSize: "0.9em",
      fill: am5.color(0xffffff)
    });

  }

  setData(satisfactionScore: number) {
    this.satisfactionScore = satisfactionScore;
      this.handDataItem.animate({
        key: "value",
        to: satisfactionScore,
        duration: 800,
        easing: am5.ease.out(am5.ease.cubic)
      });
    }
}
