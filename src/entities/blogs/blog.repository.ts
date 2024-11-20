import { Blog } from './blog.types';
import { dbData } from '../../db/local-db';

const create = (blog: Blog): void => {
	dbData.blogs = [...dbData.blogs, blog];
};

const getAll = (): Array<Blog> => {
	return dbData.blogs;
};

const findById = (id: string): Blog | undefined => {
	return dbData.blogs.find((blog) => blog?.id === id);
};

const update = (id: string, updatedBlog: Omit<Blog, 'id'>): boolean => {
	const blogIndex = dbData.blogs.findIndex((blog) => blog.id === id);

	if (blogIndex === -1) {
		return false;
	}

	dbData.blogs[blogIndex] = {
		...dbData.blogs[blogIndex],
		...updatedBlog,
	};

	return true;
};

const remove = (id: string): boolean => {
	const blog = findById(id);

	if (!blog) {
		return false;
	}

	dbData.blogs = dbData.blogs.filter((blog) => blog.id !== id);
	return true;
};

export const blogRepositories = {
	create,
	getAll,
	findById,
	update,
	remove,
};
