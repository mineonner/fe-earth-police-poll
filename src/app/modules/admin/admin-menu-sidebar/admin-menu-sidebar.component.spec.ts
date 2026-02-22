import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMenuSidebarComponent } from './admin-menu-sidebar.component';

describe('AdminMenuSidebarComponent', () => {
  let component: AdminMenuSidebarComponent;
  let fixture: ComponentFixture<AdminMenuSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMenuSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMenuSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
