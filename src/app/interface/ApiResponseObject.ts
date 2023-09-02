export interface ApiResponseObject<T> {
  timestamp: string;
  message: string;
  data: T;
}
