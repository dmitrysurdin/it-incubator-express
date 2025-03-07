import { BlogClientModel, BlogDbModel } from './blog.types';
import { blogRepositories } from './blog.repository';
import { mapBlogFromDb, mapBlogsFromDb } from './blog.helpers';
import { PostClientModel, PostDbModel } from '../posts/post.types';
import { postRepositories } from '../posts/post.repository';
import { getExtendedPostInfo } from '../posts/post.helpers';
import { SortOrder } from 'mongoose';
import { LikeStatus } from '../../types/types';

const create = async (blog: BlogDbModel): Promise<BlogClientModel> => {
	const newBlog: BlogDbModel = {
		...blog,
		isMembership: false,
		createdAt: new Date().toISOString(),
	};
	const createdId = await blogRepositories.create(newBlog);

	return { ...newBlog, id: createdId };
};

const createPostForBlog = async (
	blogId: string,
	post: PostDbModel,
): Promise<PostClientModel | null> => {
	const blog = await blogRepositories.findById(blogId);

	if (!blog) {
		return null;
	}

	const newPost: PostDbModel = {
		...post,
		blogId,
		blogName: blog?.name,
		createdAt: new Date().toISOString(),
		extendedLikesInfo: {
			likesCount: 0,
			dislikesCount: 0,
			newestLikes: [],
		},
	};
	const createdId = await postRepositories.create(newPost);

	return {
		...newPost,
		extendedLikesInfo: { ...newPost.extendedLikesInfo, myStatus: LikeStatus.None },
		id: createdId,
	};
};

const getAllPostsByBlogId = async ({
	blogId,
	pageSize,
	pageNumber,
	sortDirection,
	sortBy,
	searchNameTerm,
	userId,
}: {
	blogId: string;
	pageSize?: string;
	pageNumber?: string;
	sortDirection?: string;
	sortBy?: string;
	searchNameTerm?: string;
	userId?: string;
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
		sortDirection: (sortDirection as SortOrder) ?? 'desc',
		sortBy: sortBy ?? 'createdAt',
		searchNameTerm: searchNameTerm ?? null,
	};

	const { items, totalCount } = await blogRepositories.getAllPostsByBlogId({
		...params,
	});

	const pagesCount = Math.ceil(totalCount / limit);

	const extendedPosts = await Promise.all(
		items.map(async (post) => getExtendedPostInfo(post, userId)),
	);

	return {
		pagesCount,
		totalCount,
		pageSize: limit,
		page: validatedPageNumber,
		items: extendedPosts,
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
		sortDirection: (sortDirection as SortOrder) ?? 'desc',
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

const update = async (id: string, updatedBlog: BlogDbModel): Promise<boolean> => {
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
