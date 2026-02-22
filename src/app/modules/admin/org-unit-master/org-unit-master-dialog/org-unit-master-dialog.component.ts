import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseOptionDropdownModel } from '../../../../../core/models/BaseOptionDropdown.model';
import { AdminService } from '../../../shares/services/admin.service';
import { OrgUnitDropdownResModel } from '../../../shares/models/respone/org-unit-dropdown-res.model';
import { OrgUnitDropdownReqModel } from '../../../shares/models/request/org-unit-dropdown-req.model';
import { OrgUnitDataReqModel } from '../../../shares/models/request/org-unit-data-req.model';
import { AlertService } from '../../../../../core/services/alert.service';
import { HeadOrgUnitItemResModel } from '../../../shares/models/respone/head-org-unit-item-res.model';
import { OrgUnitMasterListResModel } from '../../../shares/models/respone/org-unit-master-list-res.model';
import { DataResModel } from '../../../shares/models/respone/data-res.model';
import { BaseDropdownRequestModel } from '../../../../../core/models/BaseDropdownRequest.model';

@Component({
  selector: 'org-unit-master-dialog',
  standalone: false,
  templateUrl: './org-unit-master-dialog.component.html',
  styleUrl: './org-unit-master-dialog.component.scss'
})
export class OrgUnitMasterDialogComponent implements OnInit, OnChanges {
  @Input() data: OrgUnitMasterListResModel;
  form: FormGroup;
  formEvaluation: FormGroup;
  roleOption: BaseOptionDropdownModel[] = [];
  BCHOption: OrgUnitDropdownResModel[] = [];
  BKOption: OrgUnitDropdownResModel[] = [];
  KKOption: OrgUnitDropdownResModel[] = [];

  @Output() closeDialog: EventEmitter<any> = new EventEmitter();
  @Output() submitDialog: EventEmitter<any> = new EventEmitter();

  loader: boolean = true;

  constructor(private fb: FormBuilder,
    private _service: AdminService,
    private _alert: AlertService,
  ) {

    this.form = this.fb.group({
      org_unit_code: ['', Validators.required],
      org_unit_name: ['', Validators.required],
      org_unit_role: ['', Validators.required],
      bch_org_unit: [''],
      bk_org_unit: [''],
      kk_org_unit: [''],
      is_evaluation: ['', Validators.required],
    });

    this.formEvaluation = this.fb.group({
      evaluation_type: ['', Validators.required],
      service_work_total: [0, Validators.compose([Validators.min(0), Validators.required])],
      investigative_work_total: [0, Validators.compose([Validators.min(0), Validators.required])],
      crime_prevention_work_total: [0, Validators.compose([Validators.min(0), Validators.required])],
      traffic_work_total: [0, Validators.compose([Validators.min(0), Validators.required])],
      satisfaction_total: [0, Validators.compose([Validators.min(0), Validators.required])],
    });
  }

  async ngOnChanges(changes: SimpleChanges) {
    if ('data' in changes) {
      console.log(this.data);
      this.loader = true;
      let bch_org_unit = this.data.head_role_orgs.find(o => o.role_code == 'RO2' && this.data.org_unit_role != 'RO2')?.org_unit_code ?? '';
      let bk_org_unit = this.data.head_role_orgs.find(o => o.role_code == 'RO3' && this.data.org_unit_role != 'RO3')?.org_unit_code ?? '';
      let kk_org_unit = this.data.head_role_orgs.find(o => o.role_code == 'RO4' && this.data.org_unit_role != 'RO4')?.org_unit_code ?? '';
      this.form.patchValue(this.data);
      this.formEvaluation.patchValue(this.data);
      this.f['bch_org_unit'].setValue(bch_org_unit);
      this.f['bk_org_unit'].setValue(bk_org_unit);
      this.f['kk_org_unit'].setValue(kk_org_unit);

      await this.loadData();
      this.loader = false;
    }
  }

  ngOnInit(): void {

  }

  async loadData() {

    await Promise.all([this.getRoleDropdown(), this.getBCHOption(), this.getBKOption(), this.getKKOption()]);
  }

  // master

  async getRoleDropdown(search?: string) {
    try {
      let body: BaseDropdownRequestModel = {
        max_length: 50,
        selected_code: (!!this.f['org_unit_role'].value) ? [this.f['org_unit_role'].value] : [],
        search_text: search ?? "",
        except_codes: ['RO1'],
      }
      this.roleOption = await this._service.getRoleDropdown(body);
    } catch (ex) {
      this.roleOption = [];
    }
  }


  async getBCHOption(search?: string) {
    try {
      this.BCHOption = [];
      let body: OrgUnitDropdownReqModel = {
        org_units: [],
        role_code: "RO2",
        max_length: 50,
        selected_code: (!!this.f['bch_org_unit'].value) ? [this.f['bch_org_unit'].value] : [],
        search_text: search ?? "",
        except_codes: [],
        is_head_org: true
      }
      this.BCHOption = await this._service.getOrgUnitDropdown(body);
    } catch (ex) {
      this.BCHOption = [];
    }
  }

  async getBKOption(search?: string) {
    try {
      this.BKOption = [];
      let body: OrgUnitDropdownReqModel = {
        org_units: (!!this.f['bch_org_unit'].value) ? [this.f['bch_org_unit'].value] : [],
        role_code: "RO3",
        max_length: 50,
        selected_code: (!!this.f['bk_org_unit'].value) ? [this.f['bk_org_unit'].value] : [],
        search_text: search ?? "",
        except_codes: [],
        is_head_org: false
      }
      this.BKOption = await this._service.getOrgUnitDropdown(body);
    } catch (ex) {
      this.BKOption = [];
    }
  }

  async getKKOption(search?: string) {
    try {
      this.KKOption = [];
      let body: OrgUnitDropdownReqModel = {
        org_units: (!!this.f['bch_org_unit'].value) ? [this.f['bch_org_unit'].value] : [],
        role_code: "RO4",
        max_length: 50,
        selected_code: (!!this.f['kk_org_unit'].value) ? [this.f['kk_org_unit'].value] : [],
        search_text: search ?? "",
        except_codes: [],
        is_head_org: false
      }
      this.KKOption = await this._service.getOrgUnitDropdown(body);
    } catch (ex) {
      this.KKOption = [];
    }
  }

  async BCHSelectChange(obj: BaseOptionDropdownModel) {
    this.f['bk_org_unit'].setValue(null);
    this.f['kk_org_unit'].setValue(null);

    await Promise.all([this.getBKOption(), this.getKKOption()]);
  }

  async BKSelectChange(obj: BaseOptionDropdownModel) {
    this.f['kk_org_unit'].setValue(null);
    await Promise.all([this.getKKOption()]);
  }

  KKSelectChange(obj: BaseOptionDropdownModel) {

  }

  isEvaluationChange(val: any) {
    this.f['org_unit_code'].setValue(null);
    this.fEvo['evaluation_type'].setValue(null);
    this.fEvo['service_work_total'].setValue('0');
    this.fEvo['investigative_work_total'].setValue('0');
    this.fEvo['crime_prevention_work_total'].setValue('0');
    this.fEvo['traffic_work_total'].setValue('0');
    this.fEvo['satisfaction_total'].setValue('0');
  }

  onOrgUnitRoleSelect(obj: BaseOptionDropdownModel) {
    this.f['bch_org_unit'].setValue('');
    this.f['bk_org_unit'].setValue('');
    this.f['kk_org_unit'].setValue('');
  }

  async saveData() {
    this.form.markAllAsTouched();
    this.formEvaluation.markAllAsTouched();
    if (this.form.invalid || (!!this.f['is_evaluation'].value && this.formEvaluation.invalid)) {
      this._alert.alert('error', '', 'กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }


    let head_role_orgs: HeadOrgUnitItemResModel[] = [];

    if (!!this.f['bch_org_unit'].value) head_role_orgs.push({ role_code: 'RO2', org_unit_code: this.f['bch_org_unit'].value });
    if (!!this.f['bk_org_unit'].value) head_role_orgs.push({ role_code: 'RO3', org_unit_code: this.f['bk_org_unit'].value });
    if (!!this.f['kk_org_unit'].value) head_role_orgs.push({ role_code: 'RO4', org_unit_code: this.f['kk_org_unit'].value });

    this.data = { ...this.data, ...this.form.getRawValue() };
    this.data = {
      ...this.data, ...{
        evaluation_type: this.fEvo['evaluation_type'].getRawValue(),
        service_work_total: parseInt(this.fEvo['service_work_total'].getRawValue()),
        investigative_work_total: parseInt(this.fEvo['investigative_work_total'].getRawValue()),
        crime_prevention_work_total: parseInt(this.fEvo['crime_prevention_work_total'].getRawValue()),
        traffic_work_total: parseInt(this.fEvo['traffic_work_total'].getRawValue()),
        satisfaction_total: parseInt(this.fEvo['satisfaction_total'].getRawValue())
      }
    };

    this.data.head_role_orgs = head_role_orgs;
    this.data.evaluators_total = this.data.service_work_total + this.data.investigative_work_total
      + this.data.crime_prevention_work_total + this.data.traffic_work_total + this.data.satisfaction_total;

    let result: DataResModel<any> = await this._service.saveOrgUnit(this.data);
    if (result.status == "success") {
      this._alert.alert('success', 'สำเร็จ', 'บันทึกข้อมูลเรียบร้อย');
      this.submitDialog.emit();
    };
  }

  cancel() {
    this.closeDialog.emit();
  }

  get f() { return this.form.controls; }
  get fEvo() { return this.formEvaluation.controls; }

}
