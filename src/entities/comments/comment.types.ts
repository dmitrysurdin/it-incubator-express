interface CommentatorInfo {
	userId: string;
	userLogin: string;
}

export interface CommentDBModel {
	postId: string;
	content: string;
	commentatorInfo: CommentatorInfo;
	createdAt: string;
}

export interface CommentClientModel {
	id: string;
	content: string;
	commentatorInfo: CommentatorInfo;
	createdAt: string;
}

export interface CommentInputModel {
	content: string;
}
