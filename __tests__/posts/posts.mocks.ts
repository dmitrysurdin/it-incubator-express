import { PostModel } from '../../src/entities/posts/post.types';

export const postMock: PostModel = {
	title: 'title',
	shortDescription: 'shortDescription',
	content: 'content',
	createdAt: new Date().toISOString(),
	blogId: '123',
	blogName: 'blog name',
};
