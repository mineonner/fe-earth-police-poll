import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterOrgUnitComponent } from './filter-org-unit.component';

describe('FilterOrgUnitComponent', () => {
  let component: FilterOrgUnitComponent;
  let fixture: ComponentFixture<FilterOrgUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterOrgUnitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterOrgUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
