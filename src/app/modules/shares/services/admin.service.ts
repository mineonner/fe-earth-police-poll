import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { AlertService } from "../../../../core/services/alert.service";
import { DataResModel } from "../models/respone/data-res.model";
import { environment } from "../environment";
import { catchError, firstValueFrom, map, throwError } from "rxjs";
import { UserResModel } from "../models/respone/user-res.model";
import { LoginReqModel } from "../models/request/login-req.model";
import { DashboardResModel } from "../models/respone/dashboard-res.model";
import { DashboardReqModel } from "../models/request/dashboard-req.model";
import { OrgUnitDropdownReqModel } from "../models/request/org-unit-dropdown-req.model";
import { OrgUnitDropdownResModel } from "../models/respone/org-unit-dropdown-res.model";
import { FilterDashboardReqModel } from "../models/request/filter-dashboard-req.model";
import { FilterDashboardResModel } from "../models/respone/filter-dashboard-res.model";
import { OrgUnitMasterListReqModel } from "../models/request/org-unit-master-list-req.model";
import { OrgUnitMasterListResModel } from "../models/respone/org-unit-master-list-res.model";
import { BaseOptionDropdownModel } from "../../../../core/models/BaseOptionDropdown.model";
import { OrgUnitDataReqModel } from "../models/request/org-unit-data-req.model";
import { ImportEvoluationReqModel } from "../models/request/import-evoluation-req.model";
import { SearchUserResModel } from "../models/respone/search-user-res.model";
import { UpdateUserReqModel } from "../models/request/update-user-req.model";
import { BaseDropdownRequestModel } from "../../../../core/models/BaseDropdownRequest.model";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private _http: HttpClient,
    private _auth: AuthService,
    private _alert: AlertService,
  ) { }

  login(login: LoginReqModel) {
    return firstValueFrom(this._http.post<DataResModel<UserResModel>>(`${environment.apis.server}/api/police-pollAd/login`, login)
      .pipe(catchError(error => this.handleError(error)), map(o => o.result)));
  }

  getDashboard(dash: DashboardReqModel) {
    const headers = { 'Authorization': `Bearer ${this._auth.accessToken}` }
    return firstValueFrom(this._http.post<DataResModel<DashboardResModel[]>>(`${environment.apis.server}/api/police-pollAd/getDashboard`, dash, { headers })
      .pipe(catchError(error => this.handleError(error)), map(o => o.result)));
  }

  getOrgUnitDropdown(body: OrgUnitDropdownReqModel) {
    const headers = { 'Authorization': `Bearer ${this._auth.accessToken}` }
    return firstValueFrom(this._http.post<DataResModel<OrgUnitDropdownResModel[]>>(`${environment.apis.server}/api/police-pollAd/getOrgUnitDropdown`, body, { headers })
      .pipe(catchError(error => this.handleError(error)), map(o => o.result)));
  }

  searchFilterDashboard(body: FilterDashboardReqModel) {
    const headers = { 'Authorization': `Bearer ${this._auth.accessToken}` }
    return firstValueFrom(this._http.post<DataResModel<FilterDashboardResModel>>(`${environment.apis.server}/api/police-pollAd/searchFilterDashboard`, body, { headers })
      .pipe(catchError(error => this.handleError(error)), map(o => o.result)))
  }

  searchOrgUnitMasterList(body: OrgUnitMasterListReqModel) {
    const headers = { 'Authorization': `Bearer ${this._auth.accessToken}` }
    return firstValueFrom(this._http.post<DataResModel<OrgUnitMasterListResModel[]>>(`${environment.apis.server}/api/police-pollAd/searchOrgUnitMasterList`, body, { headers })
      .pipe(catchError(error => this.handleError(error)), map(o => o.result)))
  }

  getRoleDropdown(body: BaseDropdownRequestModel) {
    const headers = { 'Authorization': `Bearer ${this._auth.accessToken}` }
    return firstValueFrom(this._http.post<DataResModel<BaseOptionDropdownModel[]>>(`${environment.apis.server}/api/police-pollAd/getRoleDropdown`, body, { headers })
      .pipe(catchError(error => this.handleError(error)), map(o => o.result)));
  }

  saveOrgUnit(body: OrgUnitDataReqModel) {
    const headers = { 'Authorization': `Bearer ${this._auth.accessToken}` }
    return firstValueFrom(this._http.post<DataResModel<any>>(`${environment.apis.server}/api/police-pollAd/saveOrgUnit`, body, { headers })
      .pipe(catchError(error => this.handleError(error)), map(o => o)))
  }

  deleteOrgUnit(code: string) {
    const headers = { 'Authorization': `Bearer ${this._auth.accessToken}` }
    const params = new HttpParams()
      .set('code', code);
    return firstValueFrom(this._http.post<DataResModel<any>>(`${environment.apis.server}/api/police-pollAd/deleteOrgUnit`, null, { headers, params })
      .pipe(catchError(error => this.handleError(error)), map(o => o)))
  }

  searchEvaluation(body: FilterDashboardReqModel) {
    const headers = { 'Authorization': `Bearer ${this._auth.accessToken}` }
    return firstValueFrom(this._http.post<DataResModel<OrgUnitMasterListResModel[]>>(`${environment.apis.server}/api/police-pollAd/searchEvaluation`, body, { headers })
      .pipe(catchError(error => this.handleError(error)), map(o => o.result)))
  }

  importEvaluation(body: ImportEvoluationReqModel[]) {
    const headers = { 'Authorization': `Bearer ${this._auth.accessToken}` }
    return firstValueFrom(this._http.post<DataResModel<any>>(`${environment.apis.server}/api/police-pollAd/importEvaluation`, body, { headers })
      .pipe(catchError(error => this.handleError(error)), map(o => o)))
  }

  deleteEvloation(code: string) {
    const headers = { 'Authorization': `Bearer ${this._auth.accessToken}` }
    const params = new HttpParams()
      .set('code', code);
    return firstValueFrom(this._http.post<DataResModel<any>>(`${environment.apis.server}/api/police-pollAd/deleteEvoluation`, null, { headers, params })
      .pipe(catchError(error => this.handleError(error)), map(o => o)))
  }

  searchDashboardScoreCompareYears(body: FilterDashboardReqModel) {
    const headers = { 'Authorization': `Bearer ${this._auth.accessToken}` }
    return firstValueFrom(this._http.post<DataResModel<OrgUnitMasterListResModel[]>>(`${environment.apis.server}/api/police-pollAd/searchDashboardScoreCompareYears`, body, { headers })
      .pipe(catchError(error => this.handleError(error)), map(o => o.result)))
  }

  exportExcel(body:FilterDashboardReqModel) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this._auth.accessToken}`
    });

    return this._http.post(`${environment.apis.server}/api/police-pollAd/exportExcel`, body, {
      headers: headers,
      responseType: 'blob'
    });
  }

  searchUser(body: FilterDashboardReqModel) {
    const headers = { 'Authorization': `Bearer ${this._auth.accessToken}` }
    return firstValueFrom(this._http.post<DataResModel<SearchUserResModel[]>>(`${environment.apis.server}/api/police-pollAd/searchUser`, body, { headers })
      .pipe(catchError(error => this.handleError(error)), map(o => o.result)))
  }

  updateUser(body: UpdateUserReqModel) {
    const headers = { 'Authorization': `Bearer ${this._auth.accessToken}` }
    return firstValueFrom(this._http.post<DataResModel<SearchUserResModel[]>>(`${environment.apis.server}/api/police-pollAd/updateUser`, body, { headers })
      .pipe(catchError(error => this.handleError(error)), map(o => o)))
  }

  deleteUse(user: string) {
    const headers = { 'Authorization': `Bearer ${this._auth.accessToken}` }
    const params = new HttpParams()
      .set('user', user);
    return firstValueFrom(this._http.post<DataResModel<any>>(`${environment.apis.server}/api/police-pollAd/deleteUser`, null, { headers, params })
      .pipe(catchError(error => this.handleError(error)), map(o => o)))
  }

  handleError(error: HttpErrorResponse) {
    console.log(error);
    if (error.status === 401) {
      this._auth.redirectLogin();
      this._alert.alert('error', 'ขออภัย!!', 'Token หมดอายุ');
    } else {
      this._alert.alert('error', 'ขออภัย!!', error.error.message ?? 'ระบบเกิดข้อผิดพลาด รอระบบปรับปรุง');
    }
    return throwError(() => new Error('ระบบเกิดข้อผิดพลาด รอระบบปรับปรุง'));
  }
}
