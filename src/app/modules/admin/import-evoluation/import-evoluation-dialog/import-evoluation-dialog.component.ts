import { Component, EventEmitter, Output } from '@angular/core';
import * as XLSX from 'xlsx';
import { ImportEvoluationReqModel } from '../../../shares/models/request/import-evoluation-req.model';
import { OrgUnitMasterListResModel } from '../../../shares/models/respone/org-unit-master-list-res.model';
import { MUtilsService } from '../../../../../core/services/util.service';
import { AlertService } from '../../../../../core/services/alert.service';
import { AdminService } from '../../../shares/services/admin.service';

@Component({
  selector: 'import-evoluation-dialog',
  standalone: false,
  templateUrl: './import-evoluation-dialog.component.html',
  styleUrl: './import-evoluation-dialog.component.scss'
})
export class ImportEvoluationDialogComponent {
  dataUpload: ImportEvoluationReqModel[] = [];
  sortedData: OrgUnitMasterListResModel[] = [];
  pageIndex: number = 0;
  loadData: boolean = false;
  fileType: string[] = ['text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
  isLoaderImport: boolean = false;

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
      this.loadData = false;
    };

    reader.readAsBinaryString(file);
  }

  genData(jsonData: any[]) {
    let datas: ImportEvoluationReqModel[] = [];
    try {
      console.log(jsonData);
      if(jsonData[0].length != 1 || jsonData[1].length != 8 || jsonData[2].length != 12){
        this._alert.alert('error', 'แจ้งเตือน', 'รูปแบบไฟล์ไม่ถูกต้อง');
        return datas;
      }
      for (let i = 3; i < jsonData.length; i++) {
        let data: ImportEvoluationReqModel = {
          org_unit_code: jsonData[i][0]
          , evaluation_year: (jsonData[i][1]).toString()
          , service_work_score: isNaN(jsonData[i][2]) ? 0 : parseFloat(jsonData[i][2])
          , investigative_work_score: isNaN(jsonData[i][3]) ? 0 : parseFloat(jsonData[i][3])
          , crime_prevention_work_score: isNaN(jsonData[i][4]) ? 0 : parseFloat(jsonData[i][4])
          , traffic_work_score: isNaN(jsonData[i][5]) ? 0 : parseFloat(jsonData[i][5])
          , satisfaction_score: isNaN(jsonData[i][6]) ? 0 : parseFloat(jsonData[i][6])
          , service_work_count: isNaN(jsonData[i][7]) ? 0 : parseInt(jsonData[i][7])
          , investigative_work_count: isNaN(jsonData[i][8]) ? 0 : parseInt(jsonData[i][8])
          , crime_prevention_work_count: isNaN(jsonData[i][9]) ? 0 : parseInt(jsonData[i][9])
          , traffic_work_count: isNaN(jsonData[i][10]) ? 0 : parseInt(jsonData[i][10])
          , satisfaction_count: isNaN(jsonData[i][11]) ? 0 : parseInt(jsonData[i][11])

          , evaluators_amount: 0
        }

        data.evaluators_amount = data.service_work_count + data.investigative_work_count
          + data.crime_prevention_work_count + data.traffic_work_count + data.satisfaction_count;

        datas.push(data);
      }
    } catch (ex) {
      console.log(ex);
    }

    return datas;
  }

  onChangePage(val) {
    this.sortedData = val;
  }

  async importData() {
    this.isLoaderImport = true;
    let res = await this._service.importEvaluation(this.dataUpload);
    if (res.status == 'success') {
      this._alert.alert('success', 'อัพโหลดการประเมินเรียบร้อย', '');
      this.submitDialog.emit();
    }
    this.isLoaderImport = false;
  }

  cancel() {
    this.closeDialog.emit();
  }
}
