import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportOrgUnitMasterDialogComponent } from './import-org-unit-master-dialog.component';

describe('ImportOrgUnitMasterDialogComponent', () => {
  let component: ImportOrgUnitMasterDialogComponent;
  let fixture: ComponentFixture<ImportOrgUnitMasterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImportOrgUnitMasterDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportOrgUnitMasterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
