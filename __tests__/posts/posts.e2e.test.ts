import request from 'supertest';
import { app } from '../../src/app';
import { SETTINGS } from '../../src/settings';
import { postMock } from './posts.mocks';
import { blogsManager } from '../blogs/blogs.manager';
import { blogToCreate } from '../blogs/blogs.mocks';
import { postsManager } from './posts.manager';
import { testingManager } from '../testing/testing.manager';
import { setupTestDatabase } from '../setupTestDatabase';

describe('Posts API e2e tests', () => {
	setupTestDatabase();

	beforeEach(async () => {
		await testingManager.clear(204);
	});

	it('POST should create a new post', async () => {
		const createdBlog = await blogsManager.createBlog(blogToCreate, 201);

		const postToCreate = {
			...postMock,
			blogId: createdBlog.body.id,
			blogName: createdBlog.body.name,
		};

		const response = await postsManager.createPost(postToCreate, 201);

		expect(response.body).toEqual(
			expect.objectContaining({
				title: postToCreate.title,
				shortDescription: postToCreate.shortDescription,
				content: postToCreate.content,
				blogId: postToCreate.blogId,
			}),
		);
	});

	it('GET should return all posts', async () => {
		const createdBlog = await blogsManager.createBlog(blogToCreate, 201);

		const post = {
			...postMock,
			blogId: createdBlog.body.id,
			blogName: createdBlog.body.name,
		};

		await postsManager.createPost(post, 201);
		await postsManager.createPost(post, 201);

		const response = await request(app).get(SETTINGS.PATH.POSTS).expect(200);

		expect(response.body.length).toBe(2);
	});

	it('GET should find a post by ID', async () => {
		const createdBlog = await blogsManager.createBlog(blogToCreate, 201);

		const post = {
			...postMock,
			blogId: createdBlog.body.id,
			blogName: createdBlog.body.name,
		};

		const createdPost = await postsManager.createPost(post, 201);
		const postId = createdPost.body.id;

		const response = await request(app).get(`${SETTINGS.PATH.POSTS}/${postId}`).expect(200);

		expect(response.body).toEqual(
			expect.objectContaining({
				...postMock,
				blogId: createdBlog.body.id,
				blogName: createdBlog.body.name,
				createdAt: createdPost.body.createdAt,
				id: createdPost.body.id,
			}),
		);
	});

	it('PUT should update a post', async () => {
		const createdBlog = await blogsManager.createBlog(blogToCreate, 201);

		const post = {
			...postMock,
			blogId: createdBlog.body.id,
			blogName: createdBlog.body.name,
		};

		const createdPost = await postsManager.createPost(post, 201);
		const postId = createdPost.body.id;

		const updatedPost = { ...post, title: 'updated title' };

		await postsManager.updatePost(updatedPost, postId, 204);

		const response = await request(app).get(`${SETTINGS.PATH.POSTS}/${postId}`).expect(200);

		expect(response.body).toEqual(
			expect.objectContaining({
				...updatedPost,
				id: createdPost.body.id,
				createdAt: createdPost.body.createdAt,
			}),
		);
	});

	it('DELETE should delete a post by ID', async () => {
		const createdBlog = await blogsManager.createBlog(blogToCreate, 201);

		const post = {
			...postMock,
			blogId: createdBlog.body.id,
			blogName: createdBlog.body.name,
		};

		const createdPost = await postsManager.createPost(post, 201);
		const postId = createdPost.body.id;

		await postsManager.deletePost(postId, 204);

		await request(app).get(`${SETTINGS.PATH.POSTS}/${postId}`).expect(404);
	});
});
