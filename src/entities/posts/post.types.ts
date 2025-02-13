import { LikeStatus } from '../../types/types';

export interface PostDbModel {
	title: string;
	shortDescription: string;
	content: string;
	blogId: string;
	blogName: string;
	createdAt: string;
}

export type PostClientModel = {
	id: string;
} & PostDbModel;

interface CommentatorInfo {
	userId: string;
	userLogin: string;
}

export interface CommentForPostDbModel {
	postId: string;
	content: string;
	commentatorInfo: CommentatorInfo;
	createdAt: string;
	likesInfo: {
		likesCount: number;
		dislikesCount: number;
		myStatus: LikeStatus;
	};
}

export interface CommentForPostClientModel {
	id: string;
	content: string;
	commentatorInfo: CommentatorInfo;
	createdAt: string;
	likesInfo: {
		likesCount: number;
		dislikesCount: number;
		myStatus: LikeStatus;
	};
}
