import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shares/services/auth.service';
import { AlertService } from '../../../../core/services/alert.service';
import { Router } from '@angular/router';
import { AdminService } from '../../shares/services/admin.service';
import { LoginReqModel } from '../../shares/models/request/login-req.model';
import { UserResModel } from '../../shares/models/respone/user-res.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: false
})
export class LoginComponent {
  form: FormGroup;
  sentLoader: boolean = false;

  constructor(private authService: AuthService,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private router: Router,
    private _adSer: AdminService) {
    this.form = _fb.group({
      user: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  async login() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this._alert.alert('error', 'ตรวจสอบข้อผิดพลาด', 'กรุณากรอกข้อมูลให้ครบถ้วน');
    } else {
      let dataLogin:LoginReqModel = {...this.form.value};

      try{
        if(!this.sentLoader){
          this.sentLoader = true;
          let userData:UserResModel = await this._adSer.login(dataLogin);
          if(!!userData){
            this.authService.accessToken = userData.token;
            this.authService.userData = userData;
            this.router.navigate(['/admin']);
          }else{
            this._alert.alert('warning', 'ไม่พบข้อมูล', '');
          }

        }

        this.sentLoader = false;
      }catch(ex){
        this.sentLoader = false;
        this._alert.alert('error', '', ex.error.message);
      }

    }
  }

  get f() { return this.form.controls }
}
