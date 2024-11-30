import { BlogClientModel, BlogModel } from './blog.types';
import { blogRepositories } from './blog.repository';
import { mapBlogFromDb, mapBlogsFromDb } from './blog.helpers';
import { SortDirection } from 'mongodb';
import { PostClientModel, PostModel } from '../posts/post.types';
import { postRepositories } from '../posts/post.repository';
import { mapPostsFromDb } from '../posts/post.helpers';

const create = async (blog: BlogModel): Promise<BlogClientModel> => {
	const newBlog: BlogModel = {
		...blog,
		isMembership: false,
		createdAt: new Date().toISOString(),
	};
	const createdId = await blogRepositories.create(newBlog);

	return { ...newBlog, id: createdId };
};

const createPostForBlog = async (
	blogId: string,
	post: PostModel,
): Promise<PostClientModel | null> => {
	const blog = await blogRepositories.findById(blogId);

	if (!blog) {
		return null;
	}

	const newPost: PostModel = {
		...post,
		blogId,
		blogName: blog?.name,
		createdAt: new Date().toISOString(),
	};
	const createdId = await postRepositories.create(newPost);

	return { ...newPost, id: createdId };
};

const getAllPostsByBlogId = async ({
	blogId,
	pageSize,
	pageNumber,
	sortDirection,
	sortBy,
	searchNameTerm,
}: {
	blogId: string;
	pageSize?: string;
	pageNumber?: string;
	sortDirection?: string;
	sortBy?: string;
	searchNameTerm?: string;
}): Promise<{
	items: Array<PostClientModel>;
	totalCount: number;
	pagesCount: number;
	page: number;
	pageSize: number;
}> => {
	const limit = Number(pageSize) || 10;
	const validatedPageNumber = Number(pageNumber) || 1;

	const params = {
		limit,
		validatedPageNumber,
		blogId,
		skip: (validatedPageNumber - 1) * limit,
		sortDirection: (sortDirection as SortDirection) ?? 'desc',
		sortBy: sortBy ?? 'createdAt',
		searchNameTerm: searchNameTerm ?? null,
	};

	const { items, totalCount } = await blogRepositories.getAllPostsByBlogId({
		...params,
	});
	const pagesCount = Math.ceil(totalCount / limit);

	return {
		pagesCount,
		totalCount,
		pageSize: limit,
		page: validatedPageNumber,
		items: mapPostsFromDb(items),
	};
};

const getAll = async ({
	pageSize,
	pageNumber,
	sortDirection,
	sortBy,
	searchNameTerm,
}: {
	pageSize?: string;
	pageNumber?: string;
	sortDirection?: string;
	sortBy?: string;
	searchNameTerm?: string;
}): Promise<{
	items: Array<BlogClientModel>;
	totalCount: number;
	pagesCount: number;
	page: number;
	pageSize: number;
}> => {
	const limit = Number(pageSize) || 10;
	const validatedPageNumber = Number(pageNumber) || 1;

	const params = {
		limit,
		validatedPageNumber,
		skip: (validatedPageNumber - 1) * limit,
		sortDirection: (sortDirection as SortDirection) ?? 'desc',
		sortBy: sortBy ?? 'createdAt',
		searchNameTerm: searchNameTerm ?? null,
	};

	const { items, totalCount } = await blogRepositories.getAll({
		...params,
	});
	const pagesCount = Math.ceil(totalCount / limit);

	return {
		pagesCount,
		totalCount,
		pageSize: limit,
		page: validatedPageNumber,
		items: mapBlogsFromDb(items),
	};
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
	createPostForBlog,
	getAll,
	getAllPostsByBlogId,
	findById,
	update,
	remove,
};
