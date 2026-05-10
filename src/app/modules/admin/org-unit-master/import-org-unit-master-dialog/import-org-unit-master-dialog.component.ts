import { Component, EventEmitter, Output } from '@angular/core';
import { AdminService } from '../../../shares/services/admin.service';
import { MUtilsService } from '../../../../../core/services/util.service';
import { AlertService } from '../../../../../core/services/alert.service';
import { OrgUnitMasterListResModel } from '../../../shares/models/respone/org-unit-master-list-res.model';
import { ImportEvoluationReqModel } from '../../../shares/models/request/import-evoluation-req.model';
import * as XLSX from 'xlsx';
import { ImportOrgUnitMasterReqModel } from '../../../shares/models/request/import-org-unit-master-req.model';

@Component({
  selector: 'import-org-unit-master-dialog',
  standalone: false,
  templateUrl: './import-org-unit-master-dialog.component.html',
  styleUrl: './import-org-unit-master-dialog.component.scss'
})
export class ImportOrgUnitMasterDialogComponent {
  dataUpload: ImportOrgUnitMasterReqModel[] = [];
  sortedData: OrgUnitMasterListResModel[] = [];
  pageIndex: number = 0;
  loadData: boolean = false;
  isLoaderImport: boolean = false;
  fileType: string[] = ['text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];

  @Output() closeDialog: EventEmitter<any> = new EventEmitter();
  @Output() submitDialog: EventEmitter<any> = new EventEmitter();

  constructor(private _service: AdminService
    , private _util: MUtilsService
    , private _alert: AlertService
  ) { }

  dropfile(event: any) {
    this.loadData = true;
    this.dataUpload = [];
    this.sortedData = [];
    const target: DataTransfer = <DataTransfer>(event.target);
    console.log(target.files);
    if (target.files.length !== 1) {
      alert('Please select a single Excel file.');
      return;
    }

    const file: File = target.files[0];

    if (!this.fileType.some(s => s == file.type)) {
      this._alert.alert('warning', 'ประเภทไฟล์ไม่ถูกต้อง', '');
      return;
    }

    const reader: FileReader = new FileReader();


    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const sheetName: string = workbook.SheetNames[0];
      const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      this.dataUpload = this.genData(jsonData);
      this.sortedData = this._util.clone(this.dataUpload);
      console.log(this.sortedData);
      this.loadData = false;
    };

    reader.readAsBinaryString(file);
  }

  genData(jsonData: any[]) {
    let datas: ImportOrgUnitMasterReqModel[] = [];
    try {
      console.log(jsonData);
      if(jsonData[0].length != 2 || jsonData[1].length != 6 || jsonData[2].length != 6){
        this._alert.alert('error', 'แจ้งเตือน', 'รูปแบบไฟล์ไม่ถูกต้อง');
        return datas;
      }
      for (let i = 2; i < jsonData.length; i++) {
        let data: ImportOrgUnitMasterReqModel = {
          org_unit_code: jsonData[i][0]
          , service_work_total: isNaN(jsonData[i][1]) ? 0 : parseFloat(jsonData[i][2])
          , investigative_work_total: isNaN(jsonData[i][2]) ? 0 : parseFloat(jsonData[i][2])
          , crime_prevention_work_total: isNaN(jsonData[i][3]) ? 0 : parseFloat(jsonData[i][3])
          , traffic_work_total: isNaN(jsonData[i][4]) ? 0 : parseFloat(jsonData[i][4])
          , satisfaction_total: isNaN(jsonData[i][5]) ? 0 : parseFloat(jsonData[i][5])
          , evaluators_total: 0
        }

        data.evaluators_total = data.service_work_total + data.investigative_work_total
          + data.crime_prevention_work_total + data.traffic_work_total + data.satisfaction_total;

        datas.push(data);
      }
    } catch (ex) {
      console.log(ex);
    }

    return datas;
  }
  
  
  async importData() {
    this.isLoaderImport = true;
    let res = await this._service.importOrgUnitMaster(this.dataUpload);
    if (res.status == 'success') {
      this._alert.alert('success', 'อัพโหลดข้อมูลหน่วยงานเรียบร้อย', '');
      this.submitDialog.emit();
    }
    this.isLoaderImport = false;
  }

  onChangePage(val) {
    this.sortedData = val;
  }

  cancel() {
    this.closeDialog.emit();
  }
}
