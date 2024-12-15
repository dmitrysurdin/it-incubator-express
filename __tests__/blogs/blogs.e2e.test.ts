import request from 'supertest';
import { app } from '../../src/app';
import { SETTINGS } from '../../src/settings';
import { blog1, blog2, blogToCreate, blogToUpdate } from './blogs.mocks';
import { blogsManager } from './blogs.manager';
import { testingManager } from '../testing/testing.manager';
import { setupTestDatabase } from '../setupTestDatabase';

describe('Blogs API e2e tests', () => {
	setupTestDatabase();

	beforeEach(async () => {
		await testingManager.clear(204);
	});

	it('POST should create a new blog', async () => {
		const response = await blogsManager.createBlog(blogToCreate, 201);

		expect(response.body).toEqual(
			expect.objectContaining({
				name: blogToCreate.name,
				description: blogToCreate.description,
				websiteUrl: blogToCreate.websiteUrl,
			}),
		);
	});

	it('GET should return all blogs', async () => {
		await blogsManager.createBlog(blog1, 201);
		await blogsManager.createBlog(blog2, 201);

		const response = await request(app).get(SETTINGS.PATH.BLOGS).expect(200);

		expect(response.body.length).toBe(2);
	});

	it('GET should find a blog by ID', async () => {
		const createdBlog = await blogsManager.createBlog(blogToCreate, 201);

		const blogId = createdBlog.body.id.toString();
		const blogCreatedAt = createdBlog.body.createdAt;

		const response = await request(app).get(`${SETTINGS.PATH.BLOGS}/${blogId}`).expect(200);

		expect(response.body).toEqual(
			expect.objectContaining({ ...blogToCreate, id: blogId, createdAt: blogCreatedAt }),
		);
	});

	it('PUT should update a blog', async () => {
		const createdBlog = await blogsManager.createBlog(blogToCreate, 201);

		const blogId = createdBlog.body.id;
		const blogCreatedAt = createdBlog.body.createdAt;

		await blogsManager.updateBlog(blogToUpdate, blogId, 204);

		const response = await request(app).get(`${SETTINGS.PATH.BLOGS}/${blogId}`).expect(200);

		expect(response.body).toEqual(
			expect.objectContaining({ ...blogToUpdate, id: blogId, createdAt: blogCreatedAt }),
		);
	});

	it('DELETE should delete a blog by ID', async () => {
		const createdBlog = await blogsManager.createBlog(blogToCreate, 201);

		const blogId = createdBlog.body.id;

		await blogsManager.deleteBlog(blogId, 204);

		await request(app).get(`${SETTINGS.PATH.BLOGS}/${blogId}`).expect(404);
	});
});
