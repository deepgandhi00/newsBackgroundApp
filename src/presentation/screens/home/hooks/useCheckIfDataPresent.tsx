import {useInjection} from 'inversify-react';
import {useEffect, useRef, useState} from 'react';
import SqlLiteHelper from '../../../../infrastructure/clients/sqlLiteHelper';
import {Alert, BackHandler} from 'react-native';
import {DATA_CHECK_INTERVAL} from '../../../../application/utils/constants';
import {News} from '../../../../domain/entities/news/news.entity';
import {NewsRepository} from '../../../../infrastructure/repository/news/newsRepository';
import {TYPES} from '../../../../application/di/types';
import BackgroundService from 'react-native-background-actions';
import {
  backgroundTaskOptions,
  fetchNewsAndStore,
} from '../../../../application/utils/backgroundTask';


// Checking if Data is present
export const useCheckIfDataPresent = () => {
  const dataCheckInterval = useRef<NodeJS.Timeout>();
  const sqlLiteHelper = useInjection<SqlLiteHelper>(SqlLiteHelper);
  const newsApiRepository = useInjection<NewsRepository>(
    TYPES.NEWS_API_REPOSITORY,
  );

  const [isDataExists, setIsDataExists] = useState<number | null>(null);
  const [fetchedNews, setFetchedNews] = useState<Array<News> | null>(null);

  useEffect(() => {
    sqlLiteHelper
      .checkIfDataExists()
      .then(res => {
        if (res.data === 0) {
          _fetchFromAndStartService();
        } else {
          setIsDataExists(0);
        }
      })
      .catch(err => {
        console.log('err', err);
      });

    () => {
      if (dataCheckInterval.current) {
        clearInterval(dataCheckInterval.current);
      }
    };
  }, []);

  useEffect(() => {
    // getting the initial results for news
    if (isDataExists !== null) {
      sqlLiteHelper
        .getNews(isDataExists)
        .then(res => {
          if (res.data?.news?.length) {
            let allNews: Array<News> = [];
            if (fetchedNews?.length) {
              allNews.push(...fetchedNews);
            }
            allNews.push(...res.data?.news);
            setFetchedNews(allNews);
          }
        })
        .catch(err => {
          console.log('err', err);
        });
    }
  }, [isDataExists]);

  // fetch from api and start background service
  const _fetchFromAndStartService = () => {
    BackgroundService.start<void>(fetchNewsAndStore, backgroundTaskOptions);
    newsApiRepository
      .getPosts()
      .then(res => {
        checkIfDataFetched();
        if (res.data?.news?.length) {
          setFetchedNews(res.data?.news);
        }
      })
      .catch(() => {
        Alert.alert(
          'Error',
          'Error in retriving data. Please try in sometime',
          [{text: 'OK', onPress: () => BackHandler.exitApp()}],
        );
      });
  };

  // check if data is available in DB
  const checkIfDataFetched = () => {
    // checking if the data is there in db
    dataCheckInterval.current = setInterval(() => {
      sqlLiteHelper
        .checkIfDataExists()
        .then(res => {
          if (res.data && res.data > 0) {
            setIsDataExists(1);
            clearInterval(dataCheckInterval.current);
          }
        })
        .catch(err => {
          console.log('err', err);
          Alert.alert(
            'Error',
            'Error in retriving data. Please try in sometime',
            [{text: 'OK', onPress: () => BackHandler.exitApp()}],
          );
        });
    }, DATA_CHECK_INTERVAL);
  };

  return {fetchedNews};
};
