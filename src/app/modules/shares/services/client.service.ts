import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { AlertService } from "../../../../core/services/alert.service";
import { OrgUnitDropdownReqModel } from "../models/request/org-unit-dropdown-req.model";
import { catchError, firstValueFrom, map, throwError } from "rxjs";
import { DataResModel } from "../models/respone/data-res.model";
import { OrgUnitDropdownResModel } from "../models/respone/org-unit-dropdown-res.model";
import { environment } from "../environment";
import { OrgUnitEvaClientResModel } from "../models/respone/org-unit-eva-client-res.model";
import { SearchEvaluationProgressResModel } from "../models/respone/search-evaluation-progress-res.model";
import { FilterDashboardReqModel } from "../models/request/filter-dashboard-req.model";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private _http: HttpClient,
    private _auth: AuthService,
    private _alert: AlertService,
  ) { }

  getOrgUnitDropdown(body: OrgUnitDropdownReqModel) {
    return firstValueFrom(this._http.post<DataResModel<OrgUnitDropdownResModel[]>>(`${environment.apis.server}/api/police-poll/getOrgUnitDropdown`, body)
      .pipe(catchError(error => this.handleError(error)), map(o => o.result)));
  }

  getOrgUnitEvaluation(years: string) {
    const params = new HttpParams()
      .set('years', years);
    return firstValueFrom(this._http.get<DataResModel<OrgUnitEvaClientResModel>>(`${environment.apis.server}/api/police-poll/getOrgUnitEvaluation`, { params })
      .pipe(catchError(error => this.handleError(error)), map(o => o.result)));
  }

  searchEvaluationProgress(body: FilterDashboardReqModel) {
    return firstValueFrom(this._http.post<DataResModel<SearchEvaluationProgressResModel>>(`${environment.apis.server}/api/police-poll/searchEvaluationProgress`, body)
      .pipe(catchError(error => this.handleError(error)), map(o => o.result)));
  }

  getPolicePoll() {
    return firstValueFrom(this._http.get<DataResModel<any>>(`${environment.apis.server}/api/police-poll/getPolicePoll`)
      .pipe(catchError(error => this.handleError(error)), map(o => o.result)));
  }


  handleError(error: HttpErrorResponse) {
    // if (error.status === 401) {
    //   this._auth.redirectLogin();
    //   this._alert.alert('error', 'ขออภัย!!', 'Token หมดอายุ');
    // } else {
    //   this._alert.alert('error', 'ขออภัย!!', error.error.message ?? 'ระบบเกิดข้อผิดพลาด รอระบบปรับปรุง');
    // }
    return throwError(() => new Error('ระบบเกิดข้อผิดพลาด รอระบบปรับปรุง'));
  }
}
