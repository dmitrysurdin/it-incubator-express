import { Schema, model } from 'mongoose';
import { SETTINGS } from '../../settings';
import { PostDbModel } from '../../entities/posts/post.types';

const postSchema = new Schema<PostDbModel>({
	title: { type: String, required: true },
	shortDescription: { type: String, required: true },
	content: { type: String, required: true },
	blogId: { type: String, ref: 'Blog', required: true },
	blogName: { type: String, required: true },
	createdAt: { type: String, required: true },
});

export const PostModelClass = model<PostDbModel>('Post', postSchema, SETTINGS.POST_COLLECTION_NAME);
