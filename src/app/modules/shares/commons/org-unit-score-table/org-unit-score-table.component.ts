import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { OrgUnitEvoluationItemResModel } from '../../models/respone/org-unit-evoluation-item-res.model';
import { MUtilsService } from '../../../../../core/services/util.service';
import { Sort } from '@angular/material/sort';
import { OrgUnitMasterListResModel } from '../../models/respone/org-unit-master-list-res.model';
import { AdminService } from '../../services/admin.service';
import { FilterDashboardResModel } from '../../models/respone/filter-dashboard-res.model';
import { FilterDashboardReqModel } from '../../models/request/filter-dashboard-req.model';

@Component({
  selector: 'org-unit-score-table',
  standalone: false,
  templateUrl: './org-unit-score-table.component.html',
  styleUrl: './org-unit-score-table.component.scss'
})
export class OrgUnitScoreTableComponent implements OnChanges {
  @Input() data: OrgUnitMasterListResModel[] = [];
  @Input() filter: FilterDashboardReqModel;
  sortedData: OrgUnitMasterListResModel[] = [];
  sortedDataClone: OrgUnitMasterListResModel[] = [];

  constructor(private _util: MUtilsService
    , private _service: AdminService
  ) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('data' in changes) {
      this.sortedData = this._util.clone(this.data);
      this.sortedDataClone = this._util.clone(this.sortedData);
    }
  }

  sortData(sort: Sort) {
    console.log('data');
    const data = this.data.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      this.sortedDataClone = this._util.clone(this.sortedData);
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'org_unit_code':
          return this.compare(a.org_unit_code, b.org_unit_code, isAsc);
        case 'org_unit_name':
          return this.compare(a.org_unit_name, b.org_unit_name, isAsc);
        case 'service_work_score':
          return this.compare(a.service_work_score, b.service_work_score, isAsc);
        case 'investigative_work_score':
          return this.compare(a.investigative_work_score, b.investigative_work_score, isAsc);
        case 'crime_prevention_work_score':
          return this.compare(a.crime_prevention_work_score, b.crime_prevention_work_score, isAsc);
        case 'traffic_work_score':
          return this.compare(a.traffic_work_score, b.traffic_work_score, isAsc);
        case 'satisfaction_score':
          return this.compare(a.satisfaction_score, b.satisfaction_score, isAsc);
        case 'average_total_score':
          return this.compare(a.average_total_score, b.average_total_score, isAsc);
        default:
          return 0;
      }
    });

    this.sortedDataClone = this._util.clone(this.sortedData);
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  onChangePage(val) {
    this.sortedData = val;
  }

  export() {
    this._service.exportExcel(this.filter).subscribe({
      next: (blob: Blob) => {
        // สร้างลิงก์สำหรับดาวน์โหลด
        let filename: string[] = [];
        if (!!this.filter.bch_org_unit_name) filename.push(this.filter.bch_org_unit_name);
        if (!!this.filter.bk_org_unit_name) filename.push(this.filter.bk_org_unit_name);
        if (!!this.filter.kk_org_unit_name) filename.push(this.filter.kk_org_unit_name);
        if (!!this.filter.org_unit_name) filename.push(this.filter.org_unit_name);
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
