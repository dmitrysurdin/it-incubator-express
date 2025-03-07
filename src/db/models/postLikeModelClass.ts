import { Schema, model } from 'mongoose';
import { LikeStatus } from '../../types/types';
import { SETTINGS } from '../../settings';

const postLikeSchema = new Schema(
	{
		postId: { type: String, ref: 'Comment', required: true },
		userId: { type: String, ref: 'User', required: true },
		login: { type: String, ref: 'User', required: true },
		status: { type: String, enum: Object.values(LikeStatus), required: true },
		createdAt: { type: Date, default: Date.now },
	},
	{ timestamps: true },
);

export const PostLikeModelClass = model(
	'PostLike',
	postLikeSchema,
	SETTINGS.POST_LIKE_COLLECTION_NAME,
);
