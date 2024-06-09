import 'reflect-metadata';
import {Container} from 'inversify';
import {NewsRepository} from '../../infrastructure/repository/news/newsRepository';
import {NewsRepositoryImpl} from '../../infrastructure/repository/news/newsRespositoryImpl';
import SqlLiteHelper from '../../infrastructure/clients/sqlLiteHelper';
import {HttpClient} from '../../infrastructure/clients/http/httpClient';
import {HttpService} from '../../infrastructure/clients/http/httpService';
import {NewsRepositoryApiImpl} from '../../infrastructure/repository/news/newsRepositoryApiImpl';
import { TYPES } from './types';

// Dependency Injection
const container = new Container();
container.bind<HttpClient>(HttpClient).toSelf().inSingletonScope();
container.bind<HttpService>(HttpService).toSelf().inSingletonScope();
container.bind<SqlLiteHelper>(SqlLiteHelper).toSelf().inSingletonScope();
container
  .bind<NewsRepository>(TYPES.NEWS_SQL_REPOSITORY)
  .to(NewsRepositoryImpl)
  .inSingletonScope();
container
  .bind<NewsRepository>(TYPES.NEWS_API_REPOSITORY)
  .to(NewsRepositoryApiImpl)
  .inSingletonScope();

export {container};
