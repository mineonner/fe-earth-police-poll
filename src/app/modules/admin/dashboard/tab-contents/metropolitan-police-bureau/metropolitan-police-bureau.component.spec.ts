import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetropolitanPoliceBureauComponent } from './metropolitan-police-bureau.component';

describe('MetropolitanPoliceBureauComponent', () => {
  let component: MetropolitanPoliceBureauComponent;
  let fixture: ComponentFixture<MetropolitanPoliceBureauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetropolitanPoliceBureauComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetropolitanPoliceBureauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
