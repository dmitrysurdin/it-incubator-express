import { CommentClientModel, CommentDbModel } from './comment.types';
import { CommentModelClass } from '../../db/models';
import { ObjectId, WithId } from 'mongodb';
import { LikeStatus } from '../../types/types';
import { CommentLikeModelClass } from '../../db/models/commentLikeModelClass';

const findById = async (id: string): Promise<WithId<CommentDbModel> | null> => {
	return CommentModelClass.findById(id).lean();
};

const update = async (updatedComment: CommentClientModel): Promise<boolean> => {
	const { content, createdAt, commentatorInfo, id } = updatedComment;
	const result = await CommentModelClass.updateOne(
		{ _id: new ObjectId(id) },
		{ $set: { content, createdAt, commentatorInfo } },
	);
	return result.matchedCount > 0;
};

const remove = async (id: string): Promise<boolean> => {
	const result = await CommentModelClass.deleteOne({ _id: new ObjectId(id) });

	return result.deletedCount > 0;
};

const updateLikeStatus = async (
	commentId: string,
	likesInfo: { likesCount: number; dislikesCount: number; myStatus: LikeStatus },
): Promise<boolean> => {
	const result = await CommentModelClass.updateOne(
		{ _id: new ObjectId(commentId) },
		{
			$set: {
				'likesInfo.likesCount': likesInfo.likesCount,
				'likesInfo.dislikesCount': likesInfo.dislikesCount,
				'likesInfo.myStatus': likesInfo.myStatus,
			},
		},
	);
	return result.matchedCount > 0;
};

const getUserLikeStatus = async (commentId: string, userId: string): Promise<LikeStatus> => {
	const comment = await CommentModelClass.findById(commentId).lean();
	if (!comment) return LikeStatus.None;

	const userLike = await CommentLikeModelClass.findOne({ commentId, userId }).lean();

	return userLike ? userLike.status : LikeStatus.None;
};

export const commentRepositories = {
	findById,
	getUserLikeStatus,
	update,
	updateLikeStatus,
	remove,
};
