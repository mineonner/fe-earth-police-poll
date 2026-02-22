import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationTotalWidgetComponent } from './evaluation-total-widget.component';

describe('EvaluationTotalWidgetComponent', () => {
  let component: EvaluationTotalWidgetComponent;
  let fixture: ComponentFixture<EvaluationTotalWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EvaluationTotalWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluationTotalWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
