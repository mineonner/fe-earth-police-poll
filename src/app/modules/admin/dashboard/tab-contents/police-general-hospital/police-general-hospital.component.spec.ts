import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliceGeneralHospitalComponent } from './police-general-hospital.component';

describe('PoliceGeneralHospitalComponent', () => {
  let component: PoliceGeneralHospitalComponent;
  let fixture: ComponentFixture<PoliceGeneralHospitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PoliceGeneralHospitalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoliceGeneralHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
