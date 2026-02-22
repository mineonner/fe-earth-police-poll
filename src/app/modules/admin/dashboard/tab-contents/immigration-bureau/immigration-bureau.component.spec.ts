import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmigrationBureauComponent } from './immigration-bureau.component';

describe('ImmigrationBureauComponent', () => {
  let component: ImmigrationBureauComponent;
  let fixture: ComponentFixture<ImmigrationBureauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImmigrationBureauComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImmigrationBureauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
