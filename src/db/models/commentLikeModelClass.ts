import { Schema, model } from 'mongoose';
import { LikeStatus } from '../../types/types';
import { SETTINGS } from '../../settings';

const commentLikeSchema = new Schema(
	{
		commentId: { type: Schema.Types.ObjectId, ref: 'Comment', required: true },
		userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		status: { type: String, enum: Object.values(LikeStatus), required: true },
	},
	{ timestamps: true },
);

export const CommentLikeModelClass = model(
	'CommentLike',
	commentLikeSchema,
	SETTINGS.COMMENT_LIKE_COLLECTION_NAME,
);
