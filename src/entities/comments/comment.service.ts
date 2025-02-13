import { mapCommentFromDb } from './comment.helpers';
import { CommentClientModel } from './comment.types';
import { commentRepositories } from './comment.repository';
import { LikeStatus } from '../../types/types';
import { CommentLikeModelClass } from '../../db/models/commentLikeModelClass';
import { ObjectId } from 'mongodb';

const findById = async (id: string, userId?: string): Promise<CommentClientModel | null> => {
	const commentFromDb = await commentRepositories.findById(id);
	if (!commentFromDb) return null;

	return await mapCommentFromDb(commentFromDb, userId);
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

	const existingStatus = await commentRepositories.getUserLikeStatus(commentId, userId);

	if (existingStatus === newStatus) {
		return true;
	}

	let updatedLikes = comment.likesInfo.likesCount;
	let updatedDislikes = comment.likesInfo.dislikesCount;

	if (existingStatus === LikeStatus.Like) {
		updatedLikes -= 1;
	}
	if (existingStatus === LikeStatus.Dislike) {
		updatedDislikes -= 1;
	}

	if (newStatus === LikeStatus.Like) {
		updatedLikes += 1;
	}
	if (newStatus === LikeStatus.Dislike) {
		updatedDislikes += 1;
	}

	if (newStatus === LikeStatus.None) {
		await CommentLikeModelClass.deleteOne({
			commentId,
			userId: new ObjectId(userId),
		});
	} else {
		await CommentLikeModelClass.updateOne(
			{ commentId, userId: new ObjectId(userId) },
			{ $set: { status: newStatus } },
		);
	}

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
