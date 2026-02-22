import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MDatepickerFormComponent } from './m-datepicker-form.component';

describe('MDatepickerFormComponent', () => {
  let component: MDatepickerFormComponent;
  let fixture: ComponentFixture<MDatepickerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MDatepickerFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MDatepickerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
