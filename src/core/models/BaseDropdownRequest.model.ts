export interface BaseDropdownRequestModel {
  max_length: number;
  selected_code: string[];
  search_text: string;
  except_codes: string[];
}
