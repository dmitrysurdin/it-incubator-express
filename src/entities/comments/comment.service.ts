import { mapCommentFromDb } from './comment.helpers';
import { CommentClientModel, CommentInputModel } from './comment.types';
import { commentRepositories } from './comment.repository';
import { LikeStatus } from '../../types/types';
import { CommentLikeModelClass } from '../../db/models/commentLikeModelClass';

const findById = async (id: string, userId?: string): Promise<CommentClientModel | null> => {
	const commentFromDb = await commentRepositories.findById(id);
	if (!commentFromDb) return null;

	const myStatus = userId
		? await commentRepositories.getUserLikeStatus(id, userId)
		: LikeStatus.None;

	return {
		...mapCommentFromDb(commentFromDb),
		likesInfo: {
			likesCount: commentFromDb.likesInfo.likesCount,
			dislikesCount: commentFromDb.likesInfo.dislikesCount,
			myStatus,
		},
	};
};

const update = async (newCommentData: CommentClientModel): Promise<boolean> => {
	return await commentRepositories.update(newCommentData);
};

const remove = async (id: string): Promise<boolean> => {
	return await commentRepositories.remove(id);
};

const updateLikeStatus = async (
	commentId: string,
	userId: string,
	newStatus: LikeStatus,
): Promise<boolean> => {
	const comment = await commentRepositories.findById(commentId);
	if (!comment) return false;

	const existingLike = await CommentLikeModelClass.findOne({ commentId, userId });

	if (existingLike && existingLike.status === newStatus) {
		return true;
	}

	let updatedLikes = comment.likesInfo.likesCount;
	let updatedDislikes = comment.likesInfo.dislikesCount;

	if (existingLike) {
		if (existingLike.status === LikeStatus.Like) updatedLikes -= 1;
		if (existingLike.status === LikeStatus.Dislike) updatedDislikes -= 1;

		if (newStatus === LikeStatus.None) {
			await CommentLikeModelClass.deleteOne({ commentId, userId });
		} else {
			existingLike.status = newStatus;
			await existingLike.save();
		}
	} else {
		if (newStatus !== LikeStatus.None) {
			await new CommentLikeModelClass({ commentId, userId, status: newStatus }).save();
		}
	}

	if (newStatus === LikeStatus.Like) updatedLikes += 1;
	if (newStatus === LikeStatus.Dislike) updatedDislikes += 1;

	return await commentRepositories.updateLikeStatus(commentId, {
		likesCount: updatedLikes,
		dislikesCount: updatedDislikes,
		myStatus: newStatus,
	});
};

export const commentServices = {
	findById,
	update,
	updateLikeStatus,
	remove,
};
