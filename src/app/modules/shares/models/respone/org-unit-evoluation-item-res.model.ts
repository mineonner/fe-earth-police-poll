export interface OrgUnitEvoluationItemResModel {
  org_unit_code: string;
  org_unit_name: string;
  org_role: string;
  service_work_score: number;
  investigative_work_score: number;
  crime_prevention_work_score: number;
  traffic_work_score: number;
  satisfaction_score: number;
  average_total_score: number;
  service_work_count: number;
  investigative_work_count: number;
  crime_prevention_work_count: number;
  traffic_work_count: number;
  satisfaction_count: number;
  is_head: boolean;
  evaluation_type: string;
}
