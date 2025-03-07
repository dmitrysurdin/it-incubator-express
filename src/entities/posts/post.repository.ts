import { PostDbModel, CommentForPostDbModel } from './post.types';
import { SortOrder } from 'mongoose';
import { WithId } from 'mongodb';
import { CommentModelClass, PostModelClass } from '../../db/models';
import { PostLikeModelClass } from '../../db/models/postLikeModelClass';
import { LikeStatus } from '../../types/types';
import { authRepositories } from '../auth/auth.repository';

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

const getPostLikesInfo = async (postId: string, userId?: string) => {
	const likesCount = await PostLikeModelClass.countDocuments({ postId, status: LikeStatus.Like });
	const dislikesCount = await PostLikeModelClass.countDocuments({
		postId,
		status: LikeStatus.Dislike,
		userId,
	});

	const newestLikes = await PostLikeModelClass.find({ postId, status: LikeStatus.Like })
		.sort({ createdAt: -1 })
		.limit(3)
		.populate('userId', 'login')
		.lean();

	const myLike = userId ? await PostLikeModelClass.findOne({ postId, userId }).lean() : null;

	return {
		likesCount,
		dislikesCount,
		myStatus: myLike ? myLike.status : LikeStatus.None,
		newestLikes: newestLikes.map((like) => ({
			addedAt: like.createdAt.toISOString(),
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			userId: like.userId._id.toString(),
			login: like.login.toString(),
		})),
	};
};

const updateLikeStatus = async (postId: string, userId: string, newStatus: LikeStatus) => {
	const existingLike = await PostLikeModelClass.findOne({ postId, userId });
	const user = await authRepositories.findUserById(userId);

	let shouldRemoveFromNewest = false;

	if (existingLike) {
		if (newStatus === LikeStatus.None) {
			await PostLikeModelClass.deleteOne({ postId, userId });
			shouldRemoveFromNewest = true;
		} else {
			if (existingLike.status !== newStatus) {
				shouldRemoveFromNewest = true;
			}
			existingLike.status = newStatus;
			existingLike.createdAt = new Date();
			await existingLike.save();
		}
	} else if (newStatus !== LikeStatus.None) {
		await new PostLikeModelClass({
			postId,
			userId,
			status: newStatus,
			login: user?.login,
			createdAt: new Date(),
		}).save();
	}

	const likesCount = await PostLikeModelClass.countDocuments({ postId, status: LikeStatus.Like });
	const dislikesCount = await PostLikeModelClass.countDocuments({
		postId,
		status: LikeStatus.Dislike,
	});

	let newestLikes = await PostLikeModelClass.find({ postId, status: LikeStatus.Like })
		.sort({ createdAt: -1 })
		.limit(3)
		.lean();

	if (shouldRemoveFromNewest) {
		newestLikes = newestLikes.filter((like) => like.userId !== userId);
	}

	await PostModelClass.updateOne(
		{ _id: postId },
		{
			$set: {
				'extendedLikesInfo.likesCount': likesCount,
				'extendedLikesInfo.dislikesCount': dislikesCount,
				'extendedLikesInfo.newestLikes': newestLikes.map(({ createdAt, userId, login }) => ({
					addedAt: createdAt,
					userId,
					login,
				})),
			},
		},
	);

	return true;
};

export const postRepositories = {
	create,
	getAll,
	findById,
	update,
	remove,
	createCommentForPost,
	getAllCommentsForPost,
	getPostLikesInfo,
	updateLikeStatus,
};
