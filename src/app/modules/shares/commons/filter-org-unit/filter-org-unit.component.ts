import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { OrgUnitDropdownResModel } from '../../models/respone/org-unit-dropdown-res.model';
import { OrgUnitDropdownReqModel } from '../../models/request/org-unit-dropdown-req.model';
import { AdminService } from '../../services/admin.service';
import { FilterDashboardReqModel } from '../../models/request/filter-dashboard-req.model';
import { BaseOptionDropdownModel } from '../../../../../core/models/BaseOptionDropdown.model';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'filter-org-unit',
  standalone: false,
  templateUrl: './filter-org-unit.component.html',
  styleUrl: './filter-org-unit.component.scss'
})
export class FilterOrgUnitComponent implements AfterViewInit, OnChanges {
  @Input() filter: FilterDashboardReqModel = {
    bch_org_unit: "",
    bch_org_unit_name: "",
    bk_org_unit: "",
    bk_org_unit_name: "",
    kk_org_unit: "",
    kk_org_unit_name: "",
    org_unit: "",
    org_unit_name: "",
    evaluation_years: (new Date().getFullYear() + 543).toString()
  }
  @Input() orgUnitCodes: string[] = [];
  @Input() isClient: boolean = false;
  @Output() filterChange: EventEmitter<FilterDashboardReqModel> = new EventEmitter<FilterDashboardReqModel>();
  loader = true;

  BCHOption: OrgUnitDropdownResModel[] = [];
  BKOption: OrgUnitDropdownResModel[] = [];
  KKOption: OrgUnitDropdownResModel[] = [];
  ORGOption: OrgUnitDropdownResModel[] = [];
  yearsOption:BaseOptionDropdownModel[] = [];


  constructor(private _service: AdminService,
    private _Cliservice: ClientService
  ) {

  }

  async ngOnChanges(changes: SimpleChanges) {
    if ('filter' in changes) {
      await this.loadMasterDropdown();
    }
  }

  async ngAfterViewInit() {
    await this.loadMasterDropdown();
  }

  public async loadMasterDropdown() {
    this.loader = true;
    await Promise.all([this.getBCHOption(), this.getBKOption(), this.getKKOption(), this.getORGOption(), this.getYearsOption()]);
    this.loader = false;
  }


  // master
  async getBCHOption(search?: string) {
    try {
      this.BCHOption = [];
      let body: OrgUnitDropdownReqModel = {
        org_units: this.orgUnitCodes ?? [],
        role_code: "RO2",
        max_length: 60,
        selected_code: (!!this.filter.bch_org_unit) ? [this.filter.bch_org_unit] : [],
        search_text: search ?? "",
        except_codes: [],
        is_head_org: true
      }
      if (this.isClient) {
        this.BCHOption = await this._Cliservice.getOrgUnitDropdown(body);
      } else {
        this.BCHOption = await this._service.getOrgUnitDropdown(body);
      }

    } catch (ex) {
      this.BCHOption = [];
    }
  }

  async getBKOption(search?: string) {

    try {
      this.BKOption = [];
      let orgUnits: string[] = [];
      let isHeadOrg: boolean = false
      if (!!this.filter.bch_org_unit) orgUnits.push(this.filter.bch_org_unit);
      if (orgUnits.length == 0) {
        isHeadOrg = true;
        orgUnits = this.orgUnitCodes.slice()
      };

      let body: OrgUnitDropdownReqModel = {
        org_units: orgUnits,
        role_code: "RO3",
        max_length: 60,
        selected_code: (!!this.filter.bk_org_unit) ? [this.filter.bk_org_unit] : [],
        search_text: search ?? "",
        except_codes: [],
        is_head_org: isHeadOrg
      }
      if (this.isClient) {
        this.BKOption = await this._Cliservice.getOrgUnitDropdown(body);
      } else {
        this.BKOption = await this._service.getOrgUnitDropdown(body);
      }
    } catch (ex) {
      this.BKOption = [];
    }
  }

  async getKKOption(search?: string) {
    try {
      this.KKOption = [];
      let orgUnits: string[] = [];
      let isHeadOrg: boolean = false
      if (!!this.filter.bch_org_unit) orgUnits.push(this.filter.bch_org_unit);
      if (!!this.filter.bk_org_unit) orgUnits.push(this.filter.bk_org_unit);
      if (orgUnits.length == 0) {
        isHeadOrg = true;
        orgUnits = this.orgUnitCodes.slice()
      };

      let body: OrgUnitDropdownReqModel = {
        org_units: orgUnits,
        role_code: "RO4",
        max_length: 60,
        selected_code: (!!this.filter.kk_org_unit) ? [this.filter.kk_org_unit] : [],
        search_text: search ?? "",
        except_codes: [],
        is_head_org: isHeadOrg
      }
      if (this.isClient) {
        this.KKOption = await this._Cliservice.getOrgUnitDropdown(body);
      } else {
        this.KKOption = await this._service.getOrgUnitDropdown(body);
      }
    } catch (ex) {
      this.KKOption = [];
    }
  }

  async getORGOption(search?: string) {
    try {
      this.ORGOption = [];
      let orgUnits: string[] = [];
      let isHeadOrg: boolean = false
      if (!!this.filter.bch_org_unit) orgUnits.push(this.filter.bch_org_unit);
      if (!!this.filter.bk_org_unit) orgUnits.push(this.filter.bk_org_unit);
      if (!!this.filter.kk_org_unit) orgUnits.push(this.filter.kk_org_unit);
      if (orgUnits.length == 0) {
        isHeadOrg = true;
        orgUnits = this.orgUnitCodes.slice()
      };

      let body: OrgUnitDropdownReqModel = {
        org_units: orgUnits,
        role_code: "RO5",
        max_length: 60,
        selected_code: (!!this.filter.org_unit) ? [this.filter.org_unit] : [],
        search_text: search ?? "",
        except_codes: [],
        is_head_org: isHeadOrg
      }
      if (this.isClient) {
        this.ORGOption = await this._Cliservice.getOrgUnitDropdown(body);
      } else {
        this.ORGOption = await this._service.getOrgUnitDropdown(body);
      }
    } catch (ex) {
      this.ORGOption = [];
    }
  }

  private getYearsOption(): void {
    const currentCeYear = new Date().getFullYear();
    const currentBeYear = currentCeYear + 543; // แปลง ค.ศ. เป็น พ.ศ.
    this.filter.evaluation_years = currentBeYear.toString();
    this.yearsOption = [];
    for (let i = 0; i <= 5; i++) {
      const year = (currentBeYear - i).toString();
      this.yearsOption.push({ id: year, name: year });
    }
  }

  // event
  async BCHValueChange(obj: BaseOptionDropdownModel) {
    this.filter.bch_org_unit_name = obj.name;

    this.filter.bk_org_unit = "";
    this.filter.bk_org_unit_name = "";
    this.filter.kk_org_unit = "";
    this.filter.kk_org_unit_name = "";
    this.filter.org_unit = "";
    this.filter.org_unit_name = "";
    this.filterChange.emit(this.filter);
    await Promise.all([this.getBKOption(), this.getKKOption(), this.getORGOption()]);
  }

  async BKValueChange(obj: BaseOptionDropdownModel) {
    this.filter.bk_org_unit_name = obj.name;

    this.filter.kk_org_unit = "";
    this.filter.kk_org_unit_name = "";

    this.filter.org_unit = "";
    this.filter.org_unit_name = "";

    this.filterChange.emit(this.filter);
    await Promise.all([this.getKKOption(), this.getORGOption()]);
  }

  async KKValueChange(obj: BaseOptionDropdownModel) {
    this.filter.kk_org_unit_name = obj.name;

    this.filter.org_unit = "";
    this.filter.org_unit_name = "";
    this.filterChange.emit(this.filter);
    await Promise.all([this.getORGOption()]);
  }

  async ORGValueChange(obj: BaseOptionDropdownModel) {
    this.filter.org_unit_name = obj.name;
    this.filterChange.emit(this.filter);
  }

  yearsValueChange(obj: BaseOptionDropdownModel) {
    this.filter.evaluation_years = obj.id;
    this.filterChange.emit(this.filter);
  }
}
