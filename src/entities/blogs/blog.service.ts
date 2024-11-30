import { BlogClientModel, BlogModel } from './blog.types';
import { blogRepositories } from './blog.repository';
import { mapBlogFromDb, mapBlogsFromDb } from './blog.helpers';
import { SortDirection } from 'mongodb';

const create = async (blog: BlogModel): Promise<BlogClientModel> => {
	const newBlog: BlogModel = {
		...blog,
		isMembership: false,
		createdAt: new Date().toISOString(),
	};
	const createdId = await blogRepositories.create(newBlog);

	return { ...newBlog, id: createdId };
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
	getAll,
	findById,
	update,
	remove,
};
