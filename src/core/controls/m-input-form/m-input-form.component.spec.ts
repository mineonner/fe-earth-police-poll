import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MInputFormComponent } from './m-input-form.component';

describe('MInputFormComponent', () => {
  let component: MInputFormComponent;
  let fixture: ComponentFixture<MInputFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MInputFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
