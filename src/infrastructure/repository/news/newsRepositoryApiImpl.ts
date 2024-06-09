import {inject, injectable} from 'inversify';
import {ResponseModel} from '../../../domain/entities/generics/genericResponseModel.entity';
import {HttpService} from '../../clients/http/httpService';
import {NewsRepository} from './newsRepository';
import {NewsResponse} from '../../../domain/entities/news/newsResponse.entity';

// New Api Repository
@injectable()
export class NewsRepositoryApiImpl implements NewsRepository {
  httpService: HttpService;

  constructor(@inject(HttpService) httpService: HttpService) {
    this.httpService = httpService;
  }
  getPosts(): Promise<ResponseModel<NewsResponse>> {
    return this.httpService.get<NewsResponse>(`/sport`);
  }
}
