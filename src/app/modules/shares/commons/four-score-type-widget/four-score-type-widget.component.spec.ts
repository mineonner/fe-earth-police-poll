import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourScoreTypeWidgetComponent } from './four-score-type-widget.component';

describe('FourScoreTypeWidgetComponent', () => {
  let component: FourScoreTypeWidgetComponent;
  let fixture: ComponentFixture<FourScoreTypeWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FourScoreTypeWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourScoreTypeWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
