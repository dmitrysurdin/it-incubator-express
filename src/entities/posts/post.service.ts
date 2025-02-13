import {
	CommentForPostClientModel,
	CommentForPostDbModel,
	PostClientModel,
	PostDbModel,
} from './post.types';
import { blogRepositories } from '../blogs/blog.repository';
import { postRepositories } from './post.repository';
import { mapCommentFromDb, mapPostFromDb, mapPostsFromDb } from './post.helpers';
import { authRepositories } from '../auth/auth.repository';
import { SortOrder } from 'mongoose';
import { LikeStatus } from '../../types/types';

const create = async (post: PostDbModel): Promise<PostClientModel | null> => {
	const blog = await blogRepositories.findById(post.blogId);

	if (!blog) {
		return null;
	}

	const newPost: PostDbModel = {
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

	const params = {
		limit,
		validatedPageNumber,
		skip: (validatedPageNumber - 1) * limit,
		sortDirection: (sortDirection as SortOrder) ?? 'desc',
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

const update = async (id: string, updatedPost: PostDbModel): Promise<boolean> => {
	return await postRepositories.update(id, updatedPost);
};

const remove = async (id: string): Promise<boolean> => {
	return await postRepositories.remove(id);
};

const createCommentForPost = async (
	content: string,
	userId: string,
	postId: string,
): Promise<CommentForPostClientModel> => {
	const user = await authRepositories.findUserById(userId);

	const newComment: CommentForPostDbModel = {
		postId,
		content,
		createdAt: new Date().toISOString(),
		commentatorInfo: {
			userId,
			userLogin: user!.login,
		},
		likesInfo: {
			likesCount: 0,
			dislikesCount: 0,
			myStatus: LikeStatus.None,
		},
	};

	const createdCommentId = await postRepositories.createCommentForPost(newComment);

	return {
		content: newComment.content,
		commentatorInfo: { ...newComment.commentatorInfo },
		createdAt: newComment.createdAt,
		id: createdCommentId,
		likesInfo: { ...newComment.likesInfo },
	};
};

const getAllCommentsForPost = async ({
	pageSize,
	pageNumber,
	sortDirection,
	sortBy,
	postId,
	userId,
}: {
	pageSize?: string;
	pageNumber?: string;
	sortDirection?: string;
	sortBy?: string;
	postId: string;
	userId?: string;
}): Promise<{
	pagesCount: number;
	pageSize: number;
	page: number;
	totalCount: number;
	items: Array<CommentForPostClientModel>;
}> => {
	const limit = Number(pageSize) || 10;
	const validatedPageNumber = Number(pageNumber) || 1;

	const params = {
		limit,
		validatedPageNumber,
		skip: (validatedPageNumber - 1) * limit,
		sortDirection: (sortDirection as SortOrder) ?? 'desc',
		sortBy: sortBy ?? 'createdAt',
		postId,
	};

	const { items, totalCount } = await postRepositories.getAllCommentsForPost({
		...params,
	});
	const pagesCount = Math.ceil(totalCount / limit);

	const mappedItems = await Promise.all(items.map((comment) => mapCommentFromDb(comment, userId)));

	return {
		pagesCount,
		totalCount,
		pageSize: limit,
		page: validatedPageNumber,
		items: mappedItems,
	};
};

export const postServices = {
	create,
	getAll,
	findById,
	update,
	remove,
	createCommentForPost,
	getAllCommentsForPost,
};
