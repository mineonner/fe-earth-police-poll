import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MTextareaFormComponent } from './m-textarea-form.component';

describe('MTextareaFormComponent', () => {
  let component: MTextareaFormComponent;
  let fixture: ComponentFixture<MTextareaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MTextareaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MTextareaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
