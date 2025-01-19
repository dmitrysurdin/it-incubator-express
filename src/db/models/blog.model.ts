import { Schema, model } from 'mongoose';
import { BlogDbModel } from '../../entities/blogs/blog.types';
import { SETTINGS } from '../../settings';

const blogSchema = new Schema<BlogDbModel>({
	name: { type: String, required: true },
	description: { type: String, required: true },
	websiteUrl: { type: String, required: true },
	isMembership: { type: Boolean, required: true },
	createdAt: { type: String, required: true },
});

export const BlogModelClass = model<BlogDbModel>('Blog', blogSchema, SETTINGS.BLOG_COLLECTION_NAME);
