import { WithId } from 'mongodb';
import { LikeStatus } from '../../types/types';
import { commentRepositories } from './comment.repository';
import { CommentForPostClientModel, CommentForPostDbModel } from '../posts/post.types';

export const mapCommentFromDb = async (
	commentDb: WithId<CommentForPostDbModel>,
	userId?: string,
): Promise<CommentForPostClientModel> => {
	const myStatus = userId
		? await commentRepositories.getUserLikeStatus(commentDb._id.toString(), userId)
		: LikeStatus.None;

	return {
		id: commentDb._id.toString(),
		content: commentDb.content,
		createdAt: commentDb.createdAt,
		commentatorInfo: {
			userId: commentDb.commentatorInfo.userId,
			userLogin: commentDb.commentatorInfo.userLogin,
		},
		likesInfo: {
			likesCount: commentDb.likesInfo.likesCount,
			dislikesCount: commentDb.likesInfo.dislikesCount,
			myStatus,
		},
	};
};
