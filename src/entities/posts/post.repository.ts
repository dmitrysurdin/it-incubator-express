import { PostDbModel, CommentForPostDbModel } from './post.types';
import { SortOrder } from 'mongoose';
import { WithId } from 'mongodb';
import { CommentModelClass, PostModelClass } from '../../db/models';

const create = async (post: PostDbModel): Promise<string> => {
	const result = await PostModelClass.create(post);

	return result._id.toString();
};

const getAll = async ({
	limit,
	skip,
	sortDirection,
	sortBy,
	searchNameTerm,
}: {
	limit: number;
	skip: number;
	sortDirection: SortOrder;
	sortBy: string;
	searchNameTerm: string | null;
}): Promise<{
	totalCount: number;
	items: Array<WithId<PostDbModel>>;
}> => {
	const filter = searchNameTerm ? { title: { $regex: searchNameTerm, $options: 'i' } } : {};

	const items = await PostModelClass.find(filter)
		.sort({ [sortBy]: sortDirection })
		.skip(skip)
		.limit(limit)
		.lean();

	const totalCount = await PostModelClass.countDocuments(filter);

	return { items, totalCount };
};

const findById = async (id: string): Promise<WithId<PostDbModel> | null> => {
	return PostModelClass.findById(id).lean();
};

const update = async (id: string, updatedPost: Partial<PostDbModel>): Promise<boolean> => {
	const result = await PostModelClass.updateOne({ _id: id }, { $set: updatedPost });
	return result.matchedCount > 0;
};

const remove = async (id: string): Promise<boolean> => {
	const result = await PostModelClass.deleteOne({ _id: id });

	return result.deletedCount > 0;
};

const createCommentForPost = async (comment: CommentForPostDbModel): Promise<string> => {
	const result = await CommentModelClass.create(comment);

	return result._id.toString();
};

const getAllCommentsForPost = async ({
	limit,
	skip,
	sortDirection,
	sortBy,
	postId,
}: {
	limit: number;
	skip: number;
	sortDirection: SortOrder;
	sortBy: string;
	postId: string;
}): Promise<{
	totalCount: number;
	items: Array<WithId<CommentForPostDbModel>>;
}> => {
	const items = await CommentModelClass.find({ postId })
		.sort({ [sortBy]: sortDirection })
		.skip(skip)
		.limit(limit)
		.lean();

	const totalCount = await CommentModelClass.countDocuments({ postId });

	return { items, totalCount };
};

export const postRepositories = {
	create,
	getAll,
	findById,
	update,
	remove,
	createCommentForPost,
	getAllCommentsForPost,
};
