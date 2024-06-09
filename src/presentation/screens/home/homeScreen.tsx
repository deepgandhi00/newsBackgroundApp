import React from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import {useCheckIfDataPresent} from './hooks/useCheckIfDataPresent';
import {commonStyles} from '../../../application/utils/commonStyles';
import Loader from '../../components/loader/loader';
import NewsItem from './components/newsItem';

// Home Screen
const HomeScreen = (): React.ReactElement => {
  const {fetchedNews} = useCheckIfDataPresent();

  if (fetchedNews?.length) {
    return (
      <SafeAreaView style={[commonStyles.container]}>
        <View style={[commonStyles.container]}>
          <FlatList
            keyExtractor={item => item.id?.toString() || item.url}
            data={fetchedNews}
            renderItem={({item, index}) => {
              return <NewsItem news={item} />;
            }}
          />
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={[commonStyles.flex1]}>
        <Loader />
      </SafeAreaView>
    );
  }
};

export default HomeScreen;
