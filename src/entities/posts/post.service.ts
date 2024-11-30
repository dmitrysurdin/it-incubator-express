import { PostClientModel, PostModel } from './post.types';
import { blogRepositories } from '../blogs/blog.repository';
import { postRepositories } from './post.repository';
import { mapPostFromDb, mapPostsFromDb } from './post.helpers';
import { SortDirection } from 'mongodb';

const create = async (post: PostModel): Promise<PostClientModel | null> => {
	const blog = await blogRepositories.findById(post.blogId);

	if (!blog) {
		return null;
	}

	const newPost: PostModel = {
		...post,
		blogName: blog?.name,
		createdAt: new Date().toISOString(),
	};

	const createdId = await postRepositories.create(newPost);

	return { ...newPost, id: createdId };
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
	items: Array<PostClientModel>;
	totalCount: number;
	pagesCount: number;
	page: number;
	pageSize: number;
}> => {
	const limit = Number(pageSize) || 10;
	const validatedPageNumber = Number(pageNumber) || 1;

	console.log(limit);

	const params = {
		limit,
		validatedPageNumber,
		skip: (validatedPageNumber - 1) * limit,
		sortDirection: (sortDirection as SortDirection) ?? 'desc',
		sortBy: sortBy ?? 'createdAt',
		searchNameTerm: searchNameTerm ?? null,
	};

	const { items, totalCount } = await postRepositories.getAll({
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

const findById = async (id: string): Promise<PostClientModel | null> => {
	const postFromDb = await postRepositories.findById(id);

	if (!postFromDb) {
		return null;
	}

	return mapPostFromDb(postFromDb);
};

const update = async (id: string, updatedPost: PostModel): Promise<boolean> => {
	return await postRepositories.update(id, updatedPost);
};

const remove = async (id: string): Promise<boolean> => {
	return await postRepositories.remove(id);
};

export const postServices = {
	create,
	getAll,
	findById,
	update,
	remove,
};
