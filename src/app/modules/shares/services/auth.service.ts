import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserResModel } from '../models/respone/user-res.model';
import { getItemLocalStorage, setItemLocalStorage } from '../../../../core/services/local-storage.service';
import { storageNames } from './storage-name';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // isLoggedIn = false;
  // userData:UserResModel
  constructor( private router: Router,){
    // this.isLoggedIn= true;
  }

  ngOnInit(): void {

  }

  get isLoggedIn() {
  //  this.userData = JSON.parse(sessionStorage.getItem('userData')) as User;
    if(this.accessToken){
      return true;
    }else{
      return false;
    }
  }

  set accessToken(token: string) {
    if (typeof (token) !== "undefined" && token !== null) {
      setItemLocalStorage(storageNames.token, token);
    } else this.redirectLogin();
  }

  get accessToken(): string {
    return getItemLocalStorage(storageNames.token);
  }

  set userData(value: UserResModel) {
      setItemLocalStorage(storageNames.userData, JSON.stringify(value));
  }

  get userData(){
     let data = getItemLocalStorage(storageNames.userData);
    return data;
  }

  redirectLogin() {
    localStorage.clear();
    this.router.navigate(['/admin/login']);
  }
}
