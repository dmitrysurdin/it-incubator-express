import { Schema, model } from 'mongoose';
import { LikeStatus } from '../../types/types';
import { SETTINGS } from '../../settings';

const commentLikeSchema = new Schema(
	{
		commentId: { type: String, ref: 'Comment', required: true },
		userId: { type: String, ref: 'User', required: true },
		status: { type: String, enum: Object.values(LikeStatus), required: true },
	},
	{ timestamps: true },
);

export const CommentLikeModelClass = model(
	'CommentLike',
	commentLikeSchema,
	SETTINGS.COMMENT_LIKE_COLLECTION_NAME,
);
