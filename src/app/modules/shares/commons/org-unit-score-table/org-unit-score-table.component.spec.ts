import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgUnitScoreTableComponent } from './org-unit-score-table.component';

describe('OrgUnitScoreTableComponent', () => {
  let component: OrgUnitScoreTableComponent;
  let fixture: ComponentFixture<OrgUnitScoreTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrgUnitScoreTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgUnitScoreTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
