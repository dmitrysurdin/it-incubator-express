import { BlogDbModel } from '../../src/entities/blogs/blog.types';

export const blogToCreate: BlogDbModel = {
	name: 'created name',
	description: 'created blog description',
	websiteUrl: 'https://test.com',
	isMembership: false,
	createdAt: new Date().toISOString(),
};

export const blogToUpdate = {
	name: 'updated name',
	description: 'updated description',
	websiteUrl: 'https://test.com',
	isMembership: false,
	createdAt: new Date().toISOString(),
};

export const blog1 = {
	name: 'test name',
	description: 'test description',
	websiteUrl: 'https://test.com',
	isMembership: false,
	createdAt: new Date().toISOString(),
};

export const blog2 = {
	name: 'test name2',
	description: 'test description2',
	websiteUrl: 'https://test2.com',
	isMembership: false,
	createdAt: new Date().toISOString(),
};
