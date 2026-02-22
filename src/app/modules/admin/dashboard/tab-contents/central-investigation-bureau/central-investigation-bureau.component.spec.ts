import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentralInvestigationBureauComponent } from './central-investigation-bureau.component';

describe('CentralInvestigationBureauComponent', () => {
  let component: CentralInvestigationBureauComponent;
  let fixture: ComponentFixture<CentralInvestigationBureauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CentralInvestigationBureauComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CentralInvestigationBureauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
