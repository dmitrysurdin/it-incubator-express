import { BlogClientModel, BlogModel } from './blog.types';
import { blogRepositories } from './blog.repository';
import { mapBlogFromDb, mapBlogsFromDb } from './blog.helpers';

const create = async (blog: BlogModel): Promise<BlogClientModel> => {
	const newBlog: BlogModel = {
		...blog,
		isMembership: false,
		createdAt: new Date().toISOString(),
	};
	const createdId = await blogRepositories.create(newBlog);

	return { ...newBlog, id: createdId };
};

const getAll = async (): Promise<Array<BlogClientModel>> => {
	const blogsFromDb = await blogRepositories.getAll();

	return mapBlogsFromDb(blogsFromDb);
};

const findById = async (id: string): Promise<BlogClientModel | null> => {
	const blogFromDb = await blogRepositories.findById(id);

	if (!blogFromDb) {
		return null;
	}

	return mapBlogFromDb(blogFromDb);
};

const update = async (id: string, updatedBlog: BlogModel): Promise<boolean> => {
	return await blogRepositories.update(id, updatedBlog);
};

const remove = async (id: string): Promise<boolean> => {
	return await blogRepositories.remove(id);
};

export const blogServices = {
	create,
	getAll,
	findById,
	update,
	remove,
};
