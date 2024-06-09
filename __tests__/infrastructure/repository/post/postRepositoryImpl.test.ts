import {expect, jest, test, describe} from '@jest/globals';
import { mockContainer } from '../../../application/di/mockContainer';
import { HttpService } from '../../../../src/infrastructure/http/httpService';
import { PostRepositoryImpl } from '../../../../src/infrastructure/repository/post/postRepositoryImpl';
import { ResponseModel } from '../../../../src/domain/entities/generics/genericResponseModel.entity';
import { Post } from '../../../../src/domain/entities/post/posts.entity';

describe('Post Repository Impl Tests', () => {
    let httpService: HttpService;
    let postRepositoryImpl: PostRepositoryImpl;

    beforeAll(() => {
        httpService = mockContainer.get<HttpService>(HttpService);
        postRepositoryImpl = new PostRepositoryImpl(httpService);
    });

    test('Expect Success', () => {
        let mockResponse = new ResponseModel<Post[]>(200, [], null);
        expect(postRepositoryImpl.getPosts()).resolves.toEqual(mockResponse);
    });
});