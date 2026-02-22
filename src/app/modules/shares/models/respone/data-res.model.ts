export interface DataResModel<T> {
  status: string;
  message: string | null;
  result: T;
}
