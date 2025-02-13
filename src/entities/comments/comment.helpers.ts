import { WithId } from 'mongodb';
import { CommentClientModel, CommentDbModel } from './comment.types';

export const mapCommentFromDb = (commentDb: WithId<CommentDbModel>): CommentClientModel => {
	return {
		id: commentDb._id.toString(),
		content: commentDb.content,
		createdAt: commentDb.createdAt,
		commentatorInfo: {
			userId: commentDb.commentatorInfo.userId,
			userLogin: commentDb.commentatorInfo.userLogin,
		},
		likesInfo: {
			likesCount: commentDb.likesInfo?.likesCount,
			dislikesCount: commentDb.likesInfo?.dislikesCount,
			myStatus: commentDb.likesInfo?.myStatus,
		},
	};
};
