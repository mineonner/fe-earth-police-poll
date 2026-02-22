import { OrgUnitEvaClientResModel } from "./org-unit-eva-client-res.model";

export interface SearchEvaluationProgressResModel extends OrgUnitEvaClientResModel {
  service_work_total: number;
  investigative_work_total: number;
  crime_prevention_work_total: number;
  traffic_work_total: number;
  satisfaction_total: number;
  service_work_count: number;
  investigative_work_count: number;
  crime_prevention_work_count: number;
  traffic_work_count: number;
  satisfaction_count: number;
}
