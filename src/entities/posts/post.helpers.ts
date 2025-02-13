import { WithId } from 'mongodb';
import {
	CommentForPostClientModel,
	CommentForPostDbModel,
	PostClientModel,
	PostDbModel,
} from './post.types';
import { commentRepositories } from '../comments/comment.repository';
import { LikeStatus } from '../../types/types';

export const mapPostFromDb = (postDb: WithId<PostDbModel>): PostClientModel => {
	return {
		id: postDb._id.toString(),
		title: postDb.title,
		shortDescription: postDb.shortDescription,
		content: postDb.content,
		blogId: postDb.blogId,
		blogName: postDb.blogName,
		createdAt: postDb.createdAt,
	};
};

export const mapPostsFromDb = (postsDb: Array<WithId<PostDbModel>>): Array<PostClientModel> => {
	return postsDb.map(mapPostFromDb);
};

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

export const mapCommentsFromDb = (
	commentsDb: Array<WithId<CommentForPostDbModel>>,
	userId?: string,
): Array<Promise<CommentForPostClientModel>> => {
	return commentsDb.map((comment) => mapCommentFromDb(comment, userId));
};
