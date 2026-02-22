import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MGoogleMapComponent } from './m-google-map.component';

describe('MGoogleMapComponent', () => {
  let component: MGoogleMapComponent;
  let fixture: ComponentFixture<MGoogleMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MGoogleMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MGoogleMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
