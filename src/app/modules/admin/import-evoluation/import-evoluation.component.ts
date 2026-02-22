import { Component, ViewChild } from '@angular/core';
import { FilterOrgUnitComponent } from '../../shares/commons/filter-org-unit/filter-org-unit.component';
import { FilterDashboardReqModel } from '../../shares/models/request/filter-dashboard-req.model';
import { AdminService } from '../../shares/services/admin.service';
import { MUtilsService } from '../../../../core/services/util.service';
import { AlertService } from '../../../../core/services/alert.service';
import { OrgUnitMasterListResModel } from '../../shares/models/respone/org-unit-master-list-res.model';

@Component({
  selector: 'import-evoluation',
  standalone: false,
  templateUrl: './import-evoluation.component.html',
  styleUrl: './import-evoluation.component.scss'
})
export class ImportEvoluationComponent {
  @ViewChild("filterOrg") filterOrg: FilterOrgUnitComponent;
  orgUnitCodes: string[] = [];
  pageIndex: number = 0;
  data: OrgUnitMasterListResModel[] = [];
  sortedData: OrgUnitMasterListResModel[] = [];
  isShowDialog: boolean = false;
  filterData: FilterDashboardReqModel = {
    bch_org_unit: '',
    bk_org_unit: '',
    kk_org_unit: '',
    org_unit: '',
    evaluation_years: '2568'
  }
  loadData: boolean = false;

  constructor(private _service: AdminService
    , private _util: MUtilsService
    , private _alert: AlertService
  ) {

  }

  async ngAfterViewInit() {
    await this.searchEvaluation(this.filterData);
  }

  async onFilterChange(obj: FilterDashboardReqModel) {
    this.pageIndex = 0;
    this.filterData = obj;
    await this.searchEvaluation(obj);
  }

  onChangePage(val) {
    this.sortedData = val;
  }

  importDialog() {
    this.isShowDialog = !this.isShowDialog;
  }

  async searchEvaluation(body: FilterDashboardReqModel) {
    this.loadData = true;
    try {
      this.data = await this._service.searchEvaluation(body);
    } catch (ex) {
      this.data = [];
    }
    this.sortedData = this._util.clone(this.data);
    this.loadData = false;
  }

  oncloseDialog() {
    this.isShowDialog = false;
  }

  async onsubmitDialog() {
    this.oncloseDialog();
    await this.searchEvaluation(this.filterData);
  }

  async deleteEvloation(item: OrgUnitMasterListResModel) {
    //
    let conf = await this._alert.confirmAlert(`คุณต้องการลบข้อมูลหรือไม่`, `ข้อมูลการประเมินของหน่วยงาน ${item.org_unit_name}`);
    if (conf.isConfirmed) {
      try {
        let res = await this._service.deleteEvloation(item.evaluation_code);
        console.log(res);
        if (res.status == 'success') {
          this._alert.alert('success', '', `ข้อมูลการประเมินของหน่วยงาน ${item.org_unit_name} เรียบร้อย`);
          await Promise.all([this.searchEvaluation(this.filterData)]);
        }
      } catch (ex) {

      }
    }
    // confirmAlert(title: string = 'Title Message', message: string = 'Test description message !!');
  }

  export() {
    this._service.exportExcel(this.filterData).subscribe({
      next: (blob: Blob) => {
        // สร้างลิงก์สำหรับดาวน์โหลด
        let filename: string[] = [];
        if (!!this.filterData.bch_org_unit_name) filename.push(this.filterData.bch_org_unit_name);
        if (!!this.filterData.bk_org_unit_name) filename.push(this.filterData.bk_org_unit_name);
        if (!!this.filterData.kk_org_unit_name) filename.push(this.filterData.kk_org_unit_name);
        if (!!this.filterData.org_unit_name) filename.push(this.filterData.org_unit_name);
        if(filename.length == 0) filename.push('หน่วยงานทั้งหมด');

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${filename.join('-')} ${new Date().toISOString().split('T')[0]}.xlsx`;

        // เพิ่มลิงก์ลงใน DOM และคลิก
        document.body.appendChild(link);
        link.click();

        // ลบลิงก์และ URL object
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error downloading file:', error);
        alert('เกิดข้อผิดพลาดในการดาวน์โหลดไฟล์');
      }
    },)
  }

}
