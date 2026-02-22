export interface UpdateUserReqModel {
  id: number;
  user: string;
  password: string;
  role_code: string;
  org_unit_code: string;
  is_reset_password: boolean;
}
