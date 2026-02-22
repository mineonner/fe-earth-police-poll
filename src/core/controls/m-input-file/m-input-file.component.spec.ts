import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MInputFileComponent } from './m-input-file.component';

describe('MInputFileComponent', () => {
  let component: MInputFileComponent;
  let fixture: ComponentFixture<MInputFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MInputFileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MInputFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
