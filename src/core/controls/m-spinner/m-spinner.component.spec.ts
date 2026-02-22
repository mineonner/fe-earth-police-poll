import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MSpinnerComponent } from './m-spinner.component';

describe('MSpinnerComponent', () => {
  let component: MSpinnerComponent;
  let fixture: ComponentFixture<MSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MSpinnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
