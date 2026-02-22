import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluatorsAmountWidgetComponent } from './evaluators-amount-widget.component';

describe('EvaluatorsAmountWidgetComponent', () => {
  let component: EvaluatorsAmountWidgetComponent;
  let fixture: ComponentFixture<EvaluatorsAmountWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EvaluatorsAmountWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluatorsAmountWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
