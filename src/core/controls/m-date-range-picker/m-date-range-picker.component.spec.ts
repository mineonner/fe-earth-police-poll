import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MDateRangePickerComponent } from './m-date-range-picker.component';

describe('MDateRangePickerComponent', () => {
  let component: MDateRangePickerComponent;
  let fixture: ComponentFixture<MDateRangePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MDateRangePickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MDateRangePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
