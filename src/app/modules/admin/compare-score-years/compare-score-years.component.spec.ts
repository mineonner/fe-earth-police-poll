import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareScoreYearsComponent } from './compare-score-years.component';

describe('CompareScoreYearsComponent', () => {
  let component: CompareScoreYearsComponent;
  let fixture: ComponentFixture<CompareScoreYearsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompareScoreYearsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareScoreYearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
