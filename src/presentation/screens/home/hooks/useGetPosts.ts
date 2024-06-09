import {useInjection} from 'inversify-react';
import {PostRepository} from '../../../../infrastructure/repository/post/postRepository';
import TYPES from '../../../../application/di/types';
import {useEffect, useState} from 'react';
import {ResponseModel} from '../../../../domain/entities/generics/genericResponseModel.entity';
import {Post} from '../../../../domain/entities/post/posts.entity';

export const useGetPosts = () => {
  const postRepository = useInjection<PostRepository>(TYPES.POST_API_REPOSITORY);

  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    postRepository
      .getPosts()
      .then((response: ResponseModel<Post[]>) => {
        console.log(response.data);
        setPosts(response.data);
      })
      .catch((error: any) => {});
    // console.log(postRepository);
  }, []);

  return {posts};
};
