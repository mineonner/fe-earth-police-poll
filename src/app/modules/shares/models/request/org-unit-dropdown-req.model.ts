import { BaseDropdownRequestModel } from "../../../../../core/models/BaseDropdownRequest.model";

export interface OrgUnitDropdownReqModel extends  BaseDropdownRequestModel{
  org_units: string[];
  role_code: string;
  is_head_org:boolean;
}
