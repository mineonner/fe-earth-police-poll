import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FilterDashboardReqModel } from '../../shares/models/request/filter-dashboard-req.model';
import { AdminService } from '../../shares/services/admin.service';
import { OrgUnitMasterListResModel } from '../../shares/models/respone/org-unit-master-list-res.model';
import { MUtilsService } from '../../../../core/services/util.service';
import { OrgUnitMasterListReqModel } from '../../shares/models/request/org-unit-master-list-req.model';
import { OrgUnitDataReqModel } from '../../shares/models/request/org-unit-data-req.model';
import { FilterOrgUnitComponent } from '../../shares/commons/filter-org-unit/filter-org-unit.component';
import { AlertService } from '../../../../core/services/alert.service';

@Component({
  selector: 'org-unit-master',
  standalone: false,
  templateUrl: './org-unit-master.component.html',
  styleUrl: './org-unit-master.component.scss'
})
export class OrgUnitMasterComponent implements AfterViewInit {
  @ViewChild("filterOrg") filterOrg: FilterOrgUnitComponent;

  orgUnitCodes: string[] = [];
  data: OrgUnitMasterListResModel[] = [];
  sortedData: OrgUnitMasterListResModel[] = [];
  pageIndex: number = 0;
  loadData: boolean = false;
  isShowDialog: boolean = false;
  dataDialog: OrgUnitMasterListResModel;
  filterData: FilterDashboardReqModel = {
    bch_org_unit: '',
    bk_org_unit: '',
    kk_org_unit: '',
    org_unit: ''
  }
  constructor(private _service: AdminService
    , private _util: MUtilsService
    , private _alert: AlertService
  ) {

  }

  async ngAfterViewInit() {
    await this.searchOrgUnitMasterList(this.filterData);
  }

  async onFilterChange(obj: FilterDashboardReqModel) {
    this.pageIndex = 0;
    this.filterData = obj;
    await this.searchOrgUnitMasterList(obj);
  }

  async searchOrgUnitMasterList(body: OrgUnitMasterListReqModel) {
    this.loadData = true;
    try {
      this.data = await this._service.searchOrgUnitMasterList(body);
    } catch (ex) {
      this.data = [];

    }
    this.sortedData = this._util.clone(this.data);
    this.loadData = false;
  }

  onChangePage(val) {
    this.sortedData = val;
  }

  addOrgUnit() {
    let param: OrgUnitMasterListResModel = {
      id: 0,
      org_unit_code: null,
      org_unit_name: null,
      org_unit_role: null,
      evaluation_type: null,
      is_evaluation: false,
      head_org_unit: null,
      service_work_total: 0,
      investigative_work_total: 0,
      crime_prevention_work_total: 0,
      traffic_work_total: 0,
      satisfaction_total: 0,
      evaluators_total: 0,
      head_role_orgs: []
    }

    this.dataDialog = this._util.clone(param);
    this.isShowDialog = true;
  }

  async deleteOrgUnit(item: OrgUnitMasterListResModel) {
    //
    let conf = await this._alert.confirmAlert(`คุณต้องการลบข้อมูลหรือไม่`, `ถ้าลบข้อมูล หน่วยงานที่อยู่ภายใต้${item.org_unit_name}จะถูกลบไปด้วย`);
    if (conf.isConfirmed) {
      try {
        let res = await this._service.deleteOrgUnit(item.org_unit_code);
        console.log(res);
        if(res.status == 'success'){
          this._alert.alert('success', '', `ลบข้อมูลหน่วยงาน ${item.org_unit_name} เรียบร้อย`);
          await Promise.all([this.filterOrg.loadMasterDropdown(), this.searchOrgUnitMasterList(this.filterData)]);
        }
      } catch (ex) {

      }
    }
    // confirmAlert(title: string = 'Title Message', message: string = 'Test description message !!');
  }

  editOrgUnit(obj: OrgUnitMasterListResModel) {
    this.dataDialog = obj;
    this.isShowDialog = true;
  }

  closeDialog() {
    this.isShowDialog = false;
  }

  async submitDialog() {
    this.closeDialog();
    this.pageIndex = 0;
    await Promise.all([this.filterOrg.loadMasterDropdown(), this.searchOrgUnitMasterList(this.filterData)]);
  }
}
