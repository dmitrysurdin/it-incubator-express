import { Blog } from '../types/blog.types';
import { dbData } from '../../db/db';

const createBlog = (blog: Blog): void => {
	dbData.blogs = [...dbData.blogs, blog];
};

const getBlogs = (): Array<Blog> => {
	return dbData.blogs;
};

const findBlogById = (id: string): Blog | undefined => {
	return dbData.blogs.find((blog) => blog?.id === id);
};

const updateBlog = (id: string, updatedBlog: Omit<Blog, 'id'>): boolean => {
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

const removeBlog = (id: string): boolean => {
	const blog = findBlogById(id);

	if (!blog) {
		return false;
	}

	dbData.blogs = dbData.blogs.filter((blog) => blog.id !== id);
	return true;
};

const clearBlogs = (): void => {
	dbData.blogs = [];
};

export const blogRepository = {
	createBlog,
	getBlogs,
	findBlogById,
	updateBlog,
	removeBlog,
	clearBlogs,
};
