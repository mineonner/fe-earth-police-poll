import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgUnitMasterComponent } from './org-unit-master.component';

describe('OrgUnitMasterComponent', () => {
  let component: OrgUnitMasterComponent;
  let fixture: ComponentFixture<OrgUnitMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrgUnitMasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgUnitMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
