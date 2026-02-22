import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCheckboxFormComponent } from './m-checkbox-form.component';

describe('MCheckboxFormComponent', () => {
  let component: MCheckboxFormComponent;
  let fixture: ComponentFixture<MCheckboxFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCheckboxFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MCheckboxFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
