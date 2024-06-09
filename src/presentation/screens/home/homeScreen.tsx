import React, {useEffect} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {Post} from '../../../domain/entities/post/posts.entity';
import {ResponseModel} from '../../../domain/entities/generics/genericResponseModel.entity';
import {useInjection} from 'inversify-react';
import {PostRepository} from '../../../infrastructure/repository/post/postRepository';
import TYPES from '../../../application/di/types';
import { useGetPosts } from './hooks/useGetPosts';

const HomeScreen = (): React.ReactElement => {
  const {posts} = useGetPosts();

  return (
    <SafeAreaView>
      <View>
        <Text>Home</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
