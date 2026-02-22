import { HeadOrgUnitItemResModel } from "./head-org-unit-item-res.model";


export interface OrgUnitMasterListResModel {
  id: number;
  org_unit_code: string;
  org_unit_name: string;
  org_unit_role: string;
  evaluation_code?: string;
  service_work_total?: number;
  investigative_work_total?: number;
  crime_prevention_work_total?: number;
  traffic_work_total?: number;
  satisfaction_total?: number;
  evaluators_total?: number;
  evaluation_type?: string;
  is_evaluation?: boolean;
  head_org_unit?: string;
  service_work_score?: number;
  service_work_count?: number;
  investigative_work_score?: number;
  investigative_work_count?: number;
  crime_prevention_work_score?: number;
  crime_prevention_work_count?: number;
  traffic_work_score?: number;
  traffic_work_count?: number;
  satisfaction_score?: number;
  satisfaction_count?: number;
  average_total_score?: number;
  evaluators_amount?: number;
  evaluation_year?: string;
  head_role_orgs?: HeadOrgUnitItemResModel[];
}
