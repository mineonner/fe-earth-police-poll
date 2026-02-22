import { Component } from '@angular/core';
import { AdminService } from '../../shares/services/admin.service';
import { SearchUserResModel } from '../../shares/models/respone/search-user-res.model';
import { FilterDashboardReqModel } from '../../shares/models/request/filter-dashboard-req.model';
import { MUtilsService } from '../../../../core/services/util.service';
import { UpdateUserReqModel } from '../../shares/models/request/update-user-req.model';
import { AlertService } from '../../../../core/services/alert.service';

@Component({
  selector: 'user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  dataDialog: UpdateUserReqModel;
  userDatas: SearchUserResModel[] = [];
  sortedData: SearchUserResModel[] = [];
  pageIndex: number = 0;
  filterData: FilterDashboardReqModel = {
    bch_org_unit: '',
    bk_org_unit: '',
    kk_org_unit: '',
    org_unit: '',
    evaluation_years: '2568'
  }
  loader: boolean = false;
  isShowDialog: boolean = false;

  constructor(private _service: AdminService
    , private _util: MUtilsService
    , private _alert: AlertService
  ) {

  }

  async ngAfterViewInit() {
    await this.searchUser(this.filterData);
  }

  async onFilterChange(obj: FilterDashboardReqModel) {
    this.pageIndex = 0;
    this.filterData = obj;
    await this.searchUser(obj);
  }

  async searchUser(body: FilterDashboardReqModel) {
    this.loader = true;
    try {
      this.userDatas = await this._service.searchUser(body);
    } catch (ex) {
      this.userDatas = [];

    }
    this.sortedData = this._util.clone(this.userDatas);
    this.loader = false;
  }

  onChangePage(val) {
    this.sortedData = val;
  }

  addUser() {
    let param: UpdateUserReqModel = {
      id: 0,
      user: null,
      password: null,
      role_code: null,
      org_unit_code: null,
      is_reset_password: false,
    }

    this.dataDialog = param;
    this.isShowDialog = true;
  }

  editUser(data){
    this.dataDialog = data as UpdateUserReqModel;
    this.isShowDialog = true;
  }

  onCloseDialog(){
    this.isShowDialog = false;
  }

  async onSubmitDialog(){
   await this.searchUser(this.filterData);

   this.onCloseDialog();
  }

  async deleteUser(data:SearchUserResModel){
    let conf = await this._alert.confirmAlert(`แจ้งเตือน`, `คุณต้องการลบข้อมูลผู้ใช้งาน ${data.user} หรือไม่`);

        if (conf.isConfirmed) {
      try {
        let res = await this._service.deleteUse(data.user);
        if(res.status == 'success'){
          this._alert.alert('success', '', `ลบข้อมูลผู้ใช้งาน ${data.user} เรียบร้อย`);
          await this.searchUser(this.filterData);
        }
      } catch (ex) {

      }
    }
  }
}
