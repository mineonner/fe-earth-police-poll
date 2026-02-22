import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristPoliceHeadquartersComponent } from './tourist-police-headquarters.component';

describe('TouristPoliceHeadquartersComponent', () => {
  let component: TouristPoliceHeadquartersComponent;
  let fixture: ComponentFixture<TouristPoliceHeadquartersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TouristPoliceHeadquartersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TouristPoliceHeadquartersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
