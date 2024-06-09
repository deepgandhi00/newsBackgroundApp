// add your api method types and add converters
import {AxiosError} from 'axios';
import {HttpClient} from './httpClient';
import { inject, injectable } from 'inversify';
import { ResponseModel } from '../../../domain/entities/generics/genericResponseModel.entity';

@injectable()
export class HttpService {
  axiosClient: HttpClient;
  constructor(@inject(HttpClient) axiosClient: HttpClient) {
    this.axiosClient = axiosClient;
  }

  get<T>(url: string): Promise<ResponseModel<T>> {
    return new Promise((resolve, reject) => {
      this.axiosClient.axiosInstance
        .get<T>(url)
        .then(response => {
          resolve(new ResponseModel(response.status, response.data, null));
        })
        .catch((error: AxiosError) => {
          if (error.response) {
            reject(
              new ResponseModel(error.response?.status, null, error.message),
            );
          } else {
            reject(new ResponseModel(500, null, 'Something went wrong!'));
          }
        });
    });
  }
}
