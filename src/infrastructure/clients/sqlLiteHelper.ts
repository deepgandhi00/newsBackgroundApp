import SQLite, {
  Database,
  Result,
  Transaction,
} from 'react-native-sqlite-storage';
import {ResponseModel} from '../../domain/entities/generics/genericResponseModel.entity';
import {News} from '../../domain/entities/news/news.entity';
import {NewsResponse} from '../../domain/entities/news/newsResponse.entity';
import {injectable} from 'inversify';

SQLite.enablePromise(true);

@injectable()
export default class SqlLiteHelper {
  db: Database | null = null;
  constructor() {}

  // opening the db
  async open() {
    return new Promise((resolve, reject) => {
      SQLite.openDatabase({name: 'myDB', location: 'default'})
        .then((db: Database) => {
          this.db = db;
          resolve(db);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // creating the table if not exists
  async createTableIfNotExists() {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject('db is not available');
      } else {
        this.db
          .executeSql(
            'CREATE TABLE IF NOT EXISTS news(id INTEGER PRIMARY KEY AUTOINCREMENT, author TEXT, title TEXT NOT NULL, description TEXT, url TEXT, image TEXT)',
          )
          .then((res: any) => {
            resolve('Created');
          })
          .catch(error => {
            reject(error);
          });
      }
    });
  }

  // inserting list of news inside db
  async insertNews(newsList: Array<News> = []) {
    const insertQuery =
      'INSERT INTO news (author, title, description, url, image) VALUES (?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject('db is not available');
      } else if (newsList?.length) {
        let total = newsList.length;
        let executedRows = 0;
        try {
          newsList.forEach(news => {
            this.db
              ?.executeSql(insertQuery, [
                news.author,
                news.title,
                news.description,
                news.url,
                news.image,
              ])
              .then(() => {
                executedRows++;
                if (total === executedRows) {
                  resolve('');
                }
              })
              .catch(err => {
                reject(err);
              });
          });
          resolve('Inserted the data');
        } catch (err) {
          reject('Error inserting data' + err);
        }
      } else {
        reject('Please provide valid news items');
      }
    });
  }

  // getting the news from db
  async getNews(offset: number = 0): Promise<ResponseModel<NewsResponse>> {
    const selectQuery = `SELECT * FROM news ORDER BY id`;
    return new Promise<ResponseModel<NewsResponse>>((resolve, reject) => {
      if (!this.db) {
        reject('db is not available');
      } else {
        this.db
          .executeSql(selectQuery)
          .then((result: Array<Result>) => {
            let allNews: Array<News> = [];
            let fetchedCount = result[0]?.rows?.length;

            if (fetchedCount > offset) {
              for (let i = offset; i < fetchedCount; i++) {
                allNews.push(result[0].rows.item(i));
              }
              resolve(
                new ResponseModel(
                  200,
                  new NewsResponse({
                    next: allNews.length,
                    news: allNews,
                    offset: 0,
                  }),
                  null,
                ),
              );
            } else {
              resolve(
                new ResponseModel(
                  200,
                  new NewsResponse({
                    next: 0,
                    news: [],
                    offset: 0,
                  }),
                  null,
                ),
              );
            }
          })
          .catch(err => {
            reject(err);
          });
      }
    });
  }

  // checking if data exists
  async checkIfDataExists(): Promise<ResponseModel<number>> {
    const countQuery = 'SELECT * FROM news ORDER BY id';
    return new Promise<ResponseModel<number>>((resolve, reject) => {
      if (!this.db) {
        reject('db is not available');
      } else {
        this.db
          .executeSql(countQuery)
          .then((result: Array<Result>) => {
            if (result[0]?.rows?.length) {
              resolve(new ResponseModel(200, result[0].rows.length, null));
            } else {
              resolve(new ResponseModel(200, 0, null));
            }
          })
          .catch(err => {
            reject(new ResponseModel(200, null, err.message));
          });
      }
    });
  }
}
