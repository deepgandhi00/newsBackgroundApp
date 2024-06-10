import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {
  description,
  screenBackground,
  title,
} from '../../../../application/utils/colors';
import {commonStyles} from '../../../../application/utils/commonStyles';
import {News} from '../../../../domain/entities/news/news.entity';

interface NewsItemProps {
  news: News;
}

// News Item
const NewsItem = ({news}: NewsItemProps) => {
  return (
    <View
      style={[
        commonStyles.row,
        commonStyles.paddingHorizontal16,
        commonStyles.paddingVertical8,
        styles.card,
      ]}>
      <Image source={{uri: news.image}} style={[styles.image]} />
      <View style={[commonStyles.flex1, commonStyles.marginStart16]}>
        <Text style={[styles.title]} numberOfLines={2}>
          {news.headline}
        </Text>
        <Text style={[styles.description]} numberOfLines={2}>
          {news.abstract}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 64,
    width: 64,
    borderRadius: 8,
    objectFit: 'contain',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: title,
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    color: description,
  },
  card: {
    backgroundColor: screenBackground,
  },
});

export default NewsItem;
