import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgUnitMasterDialogComponent } from './org-unit-master-dialog.component';

describe('OrgUnitMasterDialogComponent', () => {
  let component: OrgUnitMasterDialogComponent;
  let fixture: ComponentFixture<OrgUnitMasterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrgUnitMasterDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgUnitMasterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
