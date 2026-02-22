import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MDateRangePickerFormComponent } from './m-date-range-picker-form.component';

describe('MDateRangePickerFormComponent', () => {
  let component: MDateRangePickerFormComponent;
  let fixture: ComponentFixture<MDateRangePickerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MDateRangePickerFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MDateRangePickerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
