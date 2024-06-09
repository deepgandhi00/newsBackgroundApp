// TODO: generic response model for api responses with status code and data or error
export class ResponseModel<T> {
  status: number;
  data: T | null;
  error: string | null;

  constructor(status: number, data: T | null, error: string | null) {
    this.status = status;
    this.data = data;
    this.error = error;
  }
}
