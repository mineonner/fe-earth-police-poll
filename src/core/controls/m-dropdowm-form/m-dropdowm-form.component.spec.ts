import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MDropdowmFormComponent } from './m-dropdowm-form.component';

describe('MDropdowmFormComponent', () => {
  let component: MDropdowmFormComponent;
  let fixture: ComponentFixture<MDropdowmFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MDropdowmFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MDropdowmFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
