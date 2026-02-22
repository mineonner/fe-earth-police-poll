import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreGaugeChartWidgetComponent } from './score-gauge-chart-widget.component';

describe('ScoreGaugeChartWidgetComponent', () => {
  let component: ScoreGaugeChartWidgetComponent;
  let fixture: ComponentFixture<ScoreGaugeChartWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScoreGaugeChartWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreGaugeChartWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
