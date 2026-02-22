import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationScoreWidgetComponent } from './evaluation-score-widget.component';

describe('EvaluationScoreWidgetComponent', () => {
  let component: EvaluationScoreWidgetComponent;
  let fixture: ComponentFixture<EvaluationScoreWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EvaluationScoreWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluationScoreWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
