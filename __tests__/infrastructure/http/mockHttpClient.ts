import {jest} from '@jest/globals';
import {AxiosInstance} from 'axios';
import {injectable} from 'inversify';
import axios from 'axios';

@injectable()
export class MockHttpClient {
  axiosInstance: AxiosInstance;

  constructor() {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    jest.mock('axios');
    this.axiosInstance = mockedAxios.create();
  }
}
