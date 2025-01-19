import { Schema, model } from 'mongoose';
import { SETTINGS } from '../../settings';
import { CommentDbModel } from '../../entities/comments/comment.types';

const commentSchema = new Schema<CommentDbModel>({
	postId: { type: String, ref: 'Post', required: true },
	content: { type: String, required: true },
	commentatorInfo: {
		userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		userName: { type: String, required: true },
	},
	createdAt: { type: String, required: true },
});

export const CommentModelClass = model<CommentDbModel>(
	'Comment',
	commentSchema,
	SETTINGS.COMMENTS_COLLECTION_NAME,
);
