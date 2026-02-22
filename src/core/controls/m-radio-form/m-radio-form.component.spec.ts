import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MRadioFormComponent } from './m-radio-form.component';

describe('MRadioFormComponent', () => {
  let component: MRadioFormComponent;
  let fixture: ComponentFixture<MRadioFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MRadioFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MRadioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
