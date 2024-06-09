// TODO: add your api method types and add converters
import {AxiosError} from 'axios';
import {ResponseModel} from '../../domain/entities/generics/genericResponseModel.entity';
import {HttpClient} from './httpClient';
import { inject, injectable } from 'inversify';

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

// export function httpClientGet<T>(url: string): Promise<ResponseModel<T>> {
//   return new Promise((resolve, reject) => {
//     httpClientInstance
//       .get<T>(url)
//       .then(response => {
//         resolve(new ResponseModel(response.status, response.data, null));
//       })
//       .catch((error: AxiosError) => {
//         if (error.response) {
//           reject(
//             new ResponseModel(error.response?.status, null, error.message),
//           );
//         } else {
//           reject(new ResponseModel(500, null, 'Something went wrong!'));
//         }
//       });
//   });
// }

// export function httpClientPost<T>(
//   url: string,
//   data: any,
// ): Promise<ResponseModel<T>> {
//   return new Promise((resolve, reject) => {
//     httpClientInstance
//       .post<T>(url, data)
//       .then(response => {
//         resolve(new ResponseModel(response.status, response.data, null));
//       })
//       .catch(error => {
//         if (error.response) {
//           reject(
//             new ResponseModel(error.response?.status, null, error.message),
//           );
//         } else {
//           reject(new ResponseModel(500, null, 'Something went wrong!'));
//         }
//       });
//   });
// }
