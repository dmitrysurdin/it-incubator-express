export interface PostModel {
	title: string;
	shortDescription: string;
	content: string;
	blogId: string;
	blogName: string;
	createdAt: string;
}

export type PostClientModel = {
	id: string;
} & PostModel;

interface CommentatorInfo {
	userId: string;
	userLogin: string;
}

export interface CommentForPostDbModel {
	postId: string;
	content: string;
	commentatorInfo: CommentatorInfo;
	createdAt: string;
}

export interface CommentForPostClientModel {
	id: string;
	content: string;
	commentatorInfo: CommentatorInfo;
	createdAt: string;
}
