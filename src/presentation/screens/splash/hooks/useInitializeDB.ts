import {useInjection} from 'inversify-react';
import {useEffect, useState} from 'react';
import SqlLiteHelper from '../../../../infrastructure/clients/sqlLiteHelper';
import {useNavigation} from '@react-navigation/native';
import {MainNavigationType} from '../../../../application/navigation/mainStackNavigation';
import {PublicRoutes} from '../../../../application/navigation/routes/publicRoute.config';
import {Alert, BackHandler} from 'react-native';

// initialize SQLite DB
export const useInitializeDB = () => {
  const sqlLiteHelper = useInjection<SqlLiteHelper>(SqlLiteHelper);
  const navigation = useNavigation<MainNavigationType>();

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    initializeDb();
  }, []);

  const initializeDb = async () => {
    try {
      await sqlLiteHelper.open();
      await sqlLiteHelper.createTableIfNotExists();
      setTimeout(() => setIsInitialized(true), 3000);
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'Error in retriving data. Please try in sometime', [
        {text: 'OK', onPress: () => BackHandler.exitApp()},
      ]);
    }
  };

  useEffect(() => {
    if (isInitialized) {
      navigation.reset({
        index: 0,
        routes: [{name: PublicRoutes.Home}],
      });
    }
  }, [isInitialized, navigation]);
};
