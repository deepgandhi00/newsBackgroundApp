import { inject, injectable } from "inversify";
import { NewsRepository } from "./newsRepository";
import SqlLiteHelper from "../../clients/sqlLiteHelper";
import { ResponseModel } from "../../../domain/entities/generics/genericResponseModel.entity";
import { News } from "../../../domain/entities/news/news.entity";
import { NewsResponse } from "../../../domain/entities/news/newsResponse.entity";

// News SQLite Repository
@injectable()
export class NewsRepositoryImpl implements NewsRepository {
  client: SqlLiteHelper;

  constructor(@inject(SqlLiteHelper) client: SqlLiteHelper) {
    this.client = client;
  }

  getPosts(): Promise<ResponseModel<NewsResponse>> {
    return this.client.getNews();
  }
}