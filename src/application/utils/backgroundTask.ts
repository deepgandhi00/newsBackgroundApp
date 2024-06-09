import {ResponseModel} from '../../domain/entities/generics/genericResponseModel.entity';
import {News} from '../../domain/entities/news/news.entity';
import {NewsResponse} from '../../domain/entities/news/newsResponse.entity';
import {HttpClient} from '../../infrastructure/clients/http/httpClient';
import {HttpService} from '../../infrastructure/clients/http/httpService';
import SqlLiteHelper from '../../infrastructure/clients/sqlLiteHelper';
import {
  ITEMS_TO_BE_FETCH_FROM_API,
  TOTAL_ITEMS_TO_BE_FETCHED,
} from './constants';
import BackgroundService from 'react-native-background-actions';

// Background task to fetch and store news items
export const fetchNewsAndStore = async () => {
  const sqlLiteHelper = new SqlLiteHelper();
  const httpClient = new HttpClient();
  const httpService = new HttpService(httpClient);
  let totalFetch = 0;
  let promises: Array<Promise<ResponseModel<NewsResponse>>> = [];
  let totalResults: Array<News> = [];
  try {
    let response: ResponseModel<NewsResponse> = await httpService.get('/sport');

    if (response.data?.news?.length) {
      totalResults.push(...response.data?.news);
    }

    let available = response.data?.next ?? 0;
    totalFetch = Math.ceil(
      Math.min(
        available / ITEMS_TO_BE_FETCH_FROM_API,
        TOTAL_ITEMS_TO_BE_FETCHED / ITEMS_TO_BE_FETCH_FROM_API,
      ),
    );

    for (let i = 0; i < totalFetch; i++) {
      promises.push(httpService.get<NewsResponse>('/sport'));
    }

    if (promises && promises.length) {
      Promise.all(promises)
        .then(res => {
          res.forEach(newsResponse => {
            if (newsResponse.data?.news?.length) {
              totalResults.push(...newsResponse.data?.news);
            }
          });
        })
        .catch(err => {
          console.log('err');
        })
        .finally(async () => {
          if (totalResults?.length) {
            await sqlLiteHelper.open();
            await sqlLiteHelper.createTableIfNotExists();
            let num = await sqlLiteHelper.insertNews(totalResults);
            
          }
          BackgroundService.stop();
        });
    } else {
      BackgroundService.stop();
    }
  } catch (err) {
    console.log('err', err);
    BackgroundService.stop();
  }
};

// for displaying notifications in android for background task
export const backgroundTaskOptions = {
  taskName: 'Fetch',
  taskTitle: 'Fetching Latest news...',
  taskDesc: 'Fetching Latest news...',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
};
