// TODO: sample repository for posts
import {ResponseModel} from '../../../domain/entities/generics/genericResponseModel.entity';
import {Post} from '../../../domain/entities/post/posts.entity';

export interface PostRepository {
  getPosts(): Promise<ResponseModel<Post[]>>;
}
