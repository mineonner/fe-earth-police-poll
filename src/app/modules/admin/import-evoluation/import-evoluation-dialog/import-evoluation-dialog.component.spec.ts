import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportEvoluationDialogComponent } from './import-evoluation-dialog.component';

describe('ImportEvoluationDialogComponent', () => {
  let component: ImportEvoluationDialogComponent;
  let fixture: ComponentFixture<ImportEvoluationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImportEvoluationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportEvoluationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
