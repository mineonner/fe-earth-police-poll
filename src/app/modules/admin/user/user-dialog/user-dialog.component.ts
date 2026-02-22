import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateUserReqModel } from '../../../shares/models/request/update-user-req.model';
import { BaseDropdownRequestModel } from '../../../../../core/models/BaseDropdownRequest.model';
import { BaseOptionDropdownModel } from '../../../../../core/models/BaseOptionDropdown.model';
import { AdminService } from '../../../shares/services/admin.service';
import { OrgUnitDropdownResModel } from '../../../shares/models/respone/org-unit-dropdown-res.model';
import { OrgUnitDropdownReqModel } from '../../../shares/models/request/org-unit-dropdown-req.model';
import { AlertService } from '../../../../../core/services/alert.service';
import { DataResModel } from '../../../shares/models/respone/data-res.model';

@Component({
  selector: 'user-dialog',
  standalone: false,
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss'
})
export class UserDialogComponent {
  @Input() data: UpdateUserReqModel;
  @Output() closeDialog: EventEmitter<any> = new EventEmitter();
  @Output() submitDialog: EventEmitter<any> = new EventEmitter();

  form: FormGroup;
  loader: boolean = true;
  roleOption: BaseOptionDropdownModel[] = [];
  orgUnitOption: OrgUnitDropdownResModel[] = [];


  constructor(private fb: FormBuilder,
    private _service: AdminService,
    private _alert: AlertService,
  ) {
    this.form = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
      role_code: ['', Validators.required],
      org_unit_code: ['', Validators.required],
      is_reset_password: [false, Validators.required],
    });
  }

  async ngOnChanges(changes: SimpleChanges) {
    if ('data' in changes) {
      this.loader = true;
      this.form.patchValue(this.data);
      await this.loadData();
      this.loader = false;
    }
  }

  async loadData() {
    await Promise.all([this.getRoleDropdown(), this.getOrgUnitOption()]);
  }

  async getRoleDropdown(search?: string) {
    try {
      let body: BaseDropdownRequestModel = {
        max_length: 50,
        selected_code: (!!this.f['role_code'].value) ? [this.f['role_code'].value] : [],
        search_text: search ?? "",
        except_codes: [],
      }
      this.roleOption = await this._service.getRoleDropdown(body);
    } catch (ex) {
      this.roleOption = [];
    }
  }

  async getOrgUnitOption(search?: string) {
    try {
      this.orgUnitOption = [];
      let body: OrgUnitDropdownReqModel = {
        org_units: [],
        role_code: this.f['role_code'].value == 'RO1' ? 'RO2' : this.f['role_code'].value,
        max_length: 50,
        selected_code: (!!this.f['org_unit_code'].value) ? [this.f['org_unit_code'].value] : [],
        search_text: search ?? "",
        except_codes: [],
        is_head_org: false
      }
      if (!!body.role_code) this.orgUnitOption = await this._service.getOrgUnitDropdown(body);
    } catch (ex) {
      this.orgUnitOption = [];
    }
  }

  async onRoleCodeSelect(obj: BaseOptionDropdownModel) {
    this.f['org_unit_code'].setValue('');
    await this.getOrgUnitOption();
  }

  onResetPasswordChange(val) {
    if(val) this.f['password'].setValue('')
      else this.f['password'].setValue(this.data.password)
  }

  cancel() {
    this.closeDialog.emit();
  }

  async saveData() {
    try {
      this.form.markAllAsTouched();
      if (this.form.invalid) {
        this._alert.alert('error', '', 'กรุณากรอกข้อมูลให้ครบถ้วน');
        return;
      }

      this.data = { ...this.data, ...this.form.getRawValue() };

      let result: DataResModel<any> = await this._service.updateUser(this.data);

      if (result.status == "success") {
        this._alert.alert('success', 'สำเร็จ', 'บันทึกข้อมูลเรียบร้อย');
        this.submitDialog.emit();
      };
    } catch (ex) {
      this._alert.alert('error', 'แจ้งเตือน', 'ไม่สามารถบันทึกข้อมูลได้');
    }
  }

  get f() { return this.form.controls; }

}
