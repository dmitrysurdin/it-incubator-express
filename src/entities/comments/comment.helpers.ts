import { WithId } from 'mongodb';
import { CommentClientModel, CommentDBModel } from './comment.types';

export const mapCommentFromDb = (commentDb: WithId<CommentDBModel>): CommentClientModel => {
	return {
		id: commentDb._id.toString(),
		content: commentDb.content,
		createdAt: commentDb.createdAt,
		commentatorInfo: {
			userId: commentDb.commentatorInfo.userId,
			userLogin: commentDb.commentatorInfo.userLogin,
		},
	};
};
