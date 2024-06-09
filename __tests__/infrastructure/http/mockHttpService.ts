import {inject, injectable} from 'inversify';
import {HttpClient} from '../../../src/infrastructure/http/httpClient';
import {jest} from '@jest/globals';
import {ResponseModel} from '../../../src/domain/entities/generics/genericResponseModel.entity';

@injectable()
export class MockHttpService {
  axiosClient: HttpClient;
  constructor(@inject(HttpClient) axiosClient: HttpClient) {
    this.axiosClient = axiosClient;
  }

  get = jest.fn(
    <T>(url: string): Promise<ResponseModel<T>> =>
      new Promise<ResponseModel<T>>(() => {}),
  );
}
