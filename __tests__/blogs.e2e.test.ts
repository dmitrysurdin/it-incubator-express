import request from 'supertest';
import { app } from '../src/app';
import { blogRepository } from '../src/entities/blogs/repositories/blogRepository';
import { SETTINGS } from '../src/settings';

describe('Video API e2e tests', () => {
	beforeEach(() => {
		blogRepository.clearBlogs();
	});

	it('POST should create a new blog', async () => {
		const response = await request(app).post(SETTINGS.PATH.BLOGS).send(blogToCreate).expect(201);

		expect(response.body).toEqual(
			expect.objectContaining({
				title: blogToCreate.title,
				author: blogToCreate.author,
				canBeDownloaded: blogToCreate.canBeDownloaded,
			}),
		);
	});

	it('GET should return all blogs', async () => {
		await request(app).post(SETTINGS.PATH.BLOGS).send(blog1);
		await request(app).post(SETTINGS.PATH.BLOGS).send(blog2);

		const response = await request(app).get(SETTINGS.PATH.BLOGS).expect(200);

		expect(response.body.length).toBe(2);
	});

	it('GET should find a blog by ID', async () => {
		const createdBlog = await request(app).post(SETTINGS.PATH.BLOGS).send(blogToCreate).expect(201);

		const blogId = createdVideo.body.id;

		const response = await request(app).get(`${SETTINGS.PATH.BLOGS}/${blogId}`).expect(200);

		expect(response.body).toEqual(expect.objectContaining(blogToCreate));
	});

	it('PUT should update a blog', async () => {
		const createdBlog = await request(app).post(SETTINGS.PATH.BLOGS).send(blogToCreate).expect(201);

		const blogId = createdBlog.body.id;

		await request(app).put(`${SETTINGS.PATH.BLOGS}/${blogId}`).send(blogToUpdate).expect(204);

		const response = await request(app).get(`${SETTINGS.PATH.BLOGS}/${blogId}`).expect(200);

		expect(response.body).toEqual(expect.objectContaining(blogToUpdate));
	});

	it('DELETE should delete a blog by ID', async () => {
		const createdBlog = await request(app).post(SETTINGS.PATH.BLOGS).send(blogToCreate).expect(201);

		const blogId = createdBlog.body.id;

		await request(app).delete(`${SETTINGS.PATH.BLOGS}/${blogId}`).expect(204);

		await request(app).get(`${SETTINGS.PATH.BLOGS}/${blogId}`).expect(404);
	});

	it('DELETE should clear all blogs', async () => {
		await request(app).post(SETTINGS.PATH.BLOGS).send(blog1);

		await request(app).delete(`${SETTINGS.PATH.TESTING}/all-data`).expect(204);

		const response = await request(app).get(SETTINGS.PATH.BLOGS).expect(200);

		expect(response.body.length).toBe(0);
	});
});
