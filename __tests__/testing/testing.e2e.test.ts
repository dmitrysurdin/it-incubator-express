import request from 'supertest';
import { app } from '../../src/app';
import { SETTINGS } from '../../src/settings';
import { blogsManager } from '../blogs/blogs.manager';
import { blogToCreate } from '../blogs/blogs.mocks';
import { testingManager } from './testing.manager';
import { postMock } from '../posts/posts.mocks';
import { postsManager } from '../posts/posts.manager';

describe('Testing API e2e tests', () => {
	it('DELETE should clear all blogs and posts', async () => {
		const createdBlog = await blogsManager.createBlog(blogToCreate, 201);

		const post = {
			...postMock,
			blogId: createdBlog.body.id,
			blogName: createdBlog.body.name,
		};

		await postsManager.createPost(post, 201);

		await testingManager.clear(204);

		const responseBlogs = await request(app).get(SETTINGS.PATH.BLOGS).expect(200);
		const responsePosts = await request(app).get(SETTINGS.PATH.POSTS).expect(200);

		expect(responseBlogs.body.length).toBe(0);
		expect(responsePosts.body.length).toBe(0);
	});
});
