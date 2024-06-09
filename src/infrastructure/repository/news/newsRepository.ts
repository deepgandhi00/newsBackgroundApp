import {ResponseModel} from '../../../domain/entities/generics/genericResponseModel.entity';
import {NewsResponse} from '../../../domain/entities/news/newsResponse.entity';

// New Repository
export interface NewsRepository {
  getPosts(): Promise<ResponseModel<NewsResponse>>;
}
