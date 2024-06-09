import 'reflect-metadata';
import {Container} from 'inversify';
import {buildProviderModule} from 'inversify-binding-decorators';
import {HttpClient} from '../../infrastructure/http/httpClient';
import {HttpService} from '../../infrastructure/http/httpService';
import TYPES from './types';
import {PostRepositoryImpl} from '../../infrastructure/repository/post/postRepositoryImpl';
import {PostRepository} from '../../infrastructure/repository/post/postRepository';

const container = new Container();
container.bind<HttpClient>(HttpClient).toSelf().inSingletonScope();
container.bind<HttpService>(HttpService).toSelf().inSingletonScope();
container
  .bind<PostRepository>(TYPES.POST_API_REPOSITORY)
  .to(PostRepositoryImpl)
  .inSingletonScope();
export {container};
