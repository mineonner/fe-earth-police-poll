import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MNumericFormComponent } from './m-numeric-form.component';

describe('MNumericFormComponent', () => {
  let component: MNumericFormComponent;
  let fixture: ComponentFixture<MNumericFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MNumericFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MNumericFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
