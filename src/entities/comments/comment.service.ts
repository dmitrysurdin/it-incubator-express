import { mapCommentFromDb } from './comment.helpers';
import { CommentClientModel, CommentInputModel } from './comment.types';
import { commentRepositories } from './comment.repository';
import { LikeStatus } from '../../types/types';

const findById = async (id: string): Promise<CommentClientModel | null> => {
	const commentFromDb = await commentRepositories.findById(id);

	if (!commentFromDb) {
		return null;
	}

	return mapCommentFromDb(commentFromDb);
};

const update = async (newCommentData: CommentClientModel): Promise<boolean> => {
	return await commentRepositories.update(newCommentData);
};

const remove = async (id: string): Promise<boolean> => {
	return await commentRepositories.remove(id);
};

const updateLikeStatus = async (commentId: string, newStatus: LikeStatus): Promise<boolean> => {
	const comment = await commentRepositories.findById(commentId);
	if (!comment) return false;

	const { likesCount, dislikesCount, myStatus } = comment.likesInfo;

	if (myStatus === newStatus) return true;

	let updatedLikes = likesCount;
	let updatedDislikes = dislikesCount;

	if (myStatus === LikeStatus.Like) updatedLikes -= 1;
	if (myStatus === LikeStatus.Dislike) updatedDislikes -= 1;

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
