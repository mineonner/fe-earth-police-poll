import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeOfProveEvidenceComponent } from './office-of-prove-evidence.component';

describe('OfficeOfProveEvidenceComponent', () => {
  let component: OfficeOfProveEvidenceComponent;
  let fixture: ComponentFixture<OfficeOfProveEvidenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfficeOfProveEvidenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficeOfProveEvidenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
