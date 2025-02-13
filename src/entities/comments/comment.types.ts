import { LikeStatus } from '../../types/types';

interface CommentatorInfo {
	userId: string;
	userLogin: string;
}

export interface CommentDbModel {
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

export interface CommentClientModel {
	id: string;
	content: string;
	commentatorInfo: CommentatorInfo;
	createdAt: string;
	likesInfo?: {
		likesCount: number;
		dislikesCount: number;
		myStatus: LikeStatus;
	};
}

export interface CommentInputModel {
	content: string;
}
