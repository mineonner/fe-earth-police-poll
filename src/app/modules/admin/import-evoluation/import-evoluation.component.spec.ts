import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportEvoluationComponent } from './import-evoluation.component';

describe('ImportEvoluationComponent', () => {
  let component: ImportEvoluationComponent;
  let fixture: ComponentFixture<ImportEvoluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImportEvoluationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportEvoluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
