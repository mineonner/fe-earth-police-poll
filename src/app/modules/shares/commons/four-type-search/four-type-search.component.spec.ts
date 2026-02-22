import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourTypeSearchComponent } from './four-type-search.component';

describe('FourTypeSearchComponent', () => {
  let component: FourTypeSearchComponent;
  let fixture: ComponentFixture<FourTypeSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FourTypeSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourTypeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
