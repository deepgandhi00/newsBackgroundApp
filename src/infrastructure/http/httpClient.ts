// TODO: create axios instance here and change configurations
import axios, {AxiosInstance} from 'axios';
import { injectable } from 'inversify';

@injectable()
export class HttpClient {
  axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  }
}
