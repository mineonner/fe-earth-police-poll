import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserResModel } from '../../shares/models/respone/user-res.model';
import { AuthService } from '../../shares/services/auth.service';

@Component({
  selector: 'admin-menu-sidebar',
  templateUrl: './admin-menu-sidebar.component.html',
  styleUrl: './admin-menu-sidebar.component.scss',
  standalone: false
})
export class AdminMenuSidebarComponent {
  @Input() isShowMenuSidebar: boolean
  @Output() isShowMenuSidebarChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  userData: UserResModel;
  constructor(private authService: AuthService,) {
    this.userData = this.authService.userData;
  }

  toggleMenuSidebar() {
    this.isShowMenuSidebar = !this.isShowMenuSidebar;
    this.isShowMenuSidebarChange.emit(this.isShowMenuSidebar);
  }
}
