import { Schema, model } from 'mongoose';
import { SETTINGS } from '../../settings';
import { CommentDbModel } from '../../entities/comments/comment.types';
import { LikeStatus } from '../../types/types';

const commentSchema = new Schema<CommentDbModel>({
	postId: { type: String, ref: 'Post', required: true },
	content: { type: String, required: true },
	commentatorInfo: {
		userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		userLogin: { type: String, required: true },
	},
	createdAt: { type: String, required: true },
	likesInfo: {
		likesCount: { type: Number, required: true },
		dislikesCount: { type: Number, required: true },
		myStatus: {
			type: String,
			enum: Object.values(LikeStatus),
			required: true,
		},
	},
});

export const CommentModelClass = model<CommentDbModel>(
	'Comment',
	commentSchema,
	SETTINGS.COMMENTS_COLLECTION_NAME,
);
