import { WithId } from 'mongodb';
import { CommentForPostClientModel, CommentForPostDbModel, PostDbModel } from './post.types';
import { commentRepositories } from '../comments/comment.repository';
import { LikeStatus } from '../../types/types';
import { postRepositories } from './post.repository';

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

export const getExtendedPostInfo = async (post: WithId<PostDbModel>, userId?: string) => {
	const likesInfo = await postRepositories.getPostLikesInfo(post._id.toString(), userId);

	return {
		id: post._id.toString(),
		title: post.title,
		shortDescription: post.shortDescription,
		content: post.content,
		blogId: post.blogId,
		blogName: post.blogName,
		createdAt: post.createdAt,
		extendedLikesInfo: likesInfo,
	};
};
