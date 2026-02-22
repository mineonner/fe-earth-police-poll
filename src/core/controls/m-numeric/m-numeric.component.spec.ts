import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MNumericComponent } from './m-numeric.component';

describe('MNumericComponent', () => {
  let component: MNumericComponent;
  let fixture: ComponentFixture<MNumericComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MNumericComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MNumericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
