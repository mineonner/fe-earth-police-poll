import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataShareService {
  private _isMobile = new BehaviorSubject<boolean>(false);
  isMobile$ = this._isMobile.asObservable();

  private _isTablet = new BehaviorSubject<boolean>(false);
  isTablet$ = this._isTablet.asObservable();

  private _isSmallDesktop = new BehaviorSubject<boolean>(false);
  isSmallDesktop$ = this._isSmallDesktop.asObservable();

  private _isDhappy = new BehaviorSubject<boolean>(false);
  isDhappy$ = this._isDhappy.asObservable();


  setMobile(bool: boolean) {
    this._isMobile.next(bool)
  }

  setTablet(bool: boolean) {
    this._isTablet.next(bool)
  }

  setSmallDesktop(bool: boolean) {
    this._isSmallDesktop.next(bool)
  }

  get isMobile() {
    return this._isMobile.getValue();
  }

  get isTablet() {
    return this._isTablet.getValue();
  }

  get isSmallDesktop() {
    return this._isSmallDesktop.getValue();
  }
}

export const CALENDAR_FORMATS = {
  parse: {

    dateInput: 'DD/MM/YYYY',

  },

  display: {

    dateInput: 'DD MMM YYYY',

    monthYearLabel: 'MMMM YYYY',

    dateA11yLabel: 'LL',

    monthYearA11yLabel: 'MMMM YYYY'

  },
};
