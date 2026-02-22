import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MRadioComponent } from './m-radio.component';

describe('MRadioComponent', () => {
  let component: MRadioComponent;
  let fixture: ComponentFixture<MRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MRadioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
