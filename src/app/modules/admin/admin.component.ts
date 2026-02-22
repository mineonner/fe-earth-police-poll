import { Component, ViewEncapsulation } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { AuthService } from '../shares/services/auth.service';
import { AdminService } from '../shares/services/admin.service';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { UserResModel } from '../shares/models/respone/user-res.model';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  standalone: false,
  encapsulation: ViewEncapsulation.None,
})
export class AdminComponent {
  isShowMenuSidebar:boolean = false;
  userData:UserResModel;
  constructor(library: FaIconLibrary,
    private authService: AuthService,
    private _adSer:AdminService
  ) {
    library.addIconPacks(fas, far);
  }

  ngOnInit(): void {
    this.userData = this.authService.userData;
  }

  logout(){
    this.authService.redirectLogin();
  }
}
