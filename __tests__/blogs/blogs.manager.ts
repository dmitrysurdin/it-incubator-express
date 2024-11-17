import { SETTINGS } from '../../src/settings';
import request from 'supertest';
import { app } from '../../src/app';
import { Blog } from '../../src/entities/blogs/blog.types';
import { authMock } from '../auth.mocks';

type BlogModel = Omit<Blog, 'id'>;

export const blogsManager = {
	createBlog: async (data: BlogModel, expectedStatusCode: number) => {
		return await request(app)
			.post(SETTINGS.PATH.BLOGS)
			.set('Authorization', authMock)
			.send(data)
			.expect(expectedStatusCode);
	},
	updateBlog: async (data: BlogModel, blogId: string, expectedStatusCode: number) => {
		return await request(app)
			.put(`${SETTINGS.PATH.BLOGS}/${blogId}`)
			.set('Authorization', authMock)
			.send(data)
			.expect(expectedStatusCode);
	},
	deleteBlog: async (blogId: string, expectedStatusCode: number) => {
		return await request(app)
			.delete(`${SETTINGS.PATH.BLOGS}/${blogId}`)
			.set('Authorization', authMock)
			.expect(expectedStatusCode);
	},
};
