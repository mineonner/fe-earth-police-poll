import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliceSpecialBranchHeadquartersComponent } from './police-special-branch-headquarters.component';

describe('PoliceSpecialBranchHeadquartersComponent', () => {
  let component: PoliceSpecialBranchHeadquartersComponent;
  let fixture: ComponentFixture<PoliceSpecialBranchHeadquartersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PoliceSpecialBranchHeadquartersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoliceSpecialBranchHeadquartersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
