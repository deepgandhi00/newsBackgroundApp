// TODO: sample api implementation for post repository
import {PostRepository} from './postRepository';
import {ResponseModel} from '../../../domain/entities/generics/genericResponseModel.entity';
import {Post} from '../../../domain/entities/post/posts.entity';
import {inject, injectable} from 'inversify';
import { HttpService } from '../../http/httpService';

@injectable()
export class PostRepositoryImpl implements PostRepository {
  httpService: HttpService;

  constructor(@inject(HttpService) httpService: HttpService) {
    this.httpService = httpService;
  }

  getPosts(): Promise<ResponseModel<Post[]>> {
    return this.httpService.get<Post[]>('/posts');
  }
}
