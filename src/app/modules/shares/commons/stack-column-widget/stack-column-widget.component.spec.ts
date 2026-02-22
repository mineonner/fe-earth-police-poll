import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackColumnWidgetComponent } from './stack-column-widget.component';

describe('StackColumnWidgetComponent', () => {
  let component: StackColumnWidgetComponent;
  let fixture: ComponentFixture<StackColumnWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StackColumnWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StackColumnWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
