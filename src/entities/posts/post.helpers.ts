import { WithId } from 'mongodb';
import {
	CommentForPostClientModel,
	CommentForPostDbModel,
	PostClientModel,
	PostDbModel,
} from './post.types';

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

export const mapCommentFromDb = (
	commentDb: WithId<CommentForPostDbModel>,
): CommentForPostClientModel => {
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

export const mapCommentsFromDb = (
	commentsDb: Array<WithId<CommentForPostDbModel>>,
): Array<CommentForPostClientModel> => {
	return commentsDb.map(mapCommentFromDb);
};
