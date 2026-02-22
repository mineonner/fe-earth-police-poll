import { AvaluatorsItemResModel } from "./avaluators-item-res.model";
import { OrgUnitEvoluationItemResModel } from "./org-unit-evoluation-item-res.model";
import { OrgUnitMasterListResModel } from "./org-unit-master-list-res.model";

export interface FilterDashboardResModel {
  bch_org_unit: AvaluatorsItemResModel;
  bk_org_unit: AvaluatorsItemResModel;
  kk_org_unit: AvaluatorsItemResModel;
  org_unit: AvaluatorsItemResModel;
  org_unit_evoluation_item_list: OrgUnitMasterListResModel[];
}
