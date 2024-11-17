import { SETTINGS } from '../../src/settings';
import request from 'supertest';
import { app } from '../../src/app';
import { authMock } from '../auth.mocks';
import { Post } from '../../src/entities/posts/post.types';

type PostModel = Omit<Post, 'id'>;

export const postsManager = {
	createPost: async (data: PostModel, expectedStatusCode: number) => {
		return await request(app)
			.post(SETTINGS.PATH.POSTS)
			.set('Authorization', authMock)
			.send(data)
			.expect(expectedStatusCode);
	},
	updatePost: async (data: PostModel, postId: string, expectedStatusCode: number) => {
		return await request(app)
			.put(`${SETTINGS.PATH.POSTS}/${postId}`)
			.set('Authorization', authMock)
			.send(data)
			.expect(expectedStatusCode);
	},
	deletePost: async (postId: string, expectedStatusCode: number) => {
		return await request(app)
			.delete(`${SETTINGS.PATH.POSTS}/${postId}`)
			.set('Authorization', authMock)
			.expect(expectedStatusCode);
	},
};
