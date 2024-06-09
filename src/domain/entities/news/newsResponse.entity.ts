import {News} from './news.entity';

// News Response Model
export class NewsResponse {
  offset: number;
  next: number;
  news: Array<News>;
  constructor(model: NewsResponse) {
    this.next = model.next;
    this.news = model.news;
    this.offset = model.offset;
  }
}
