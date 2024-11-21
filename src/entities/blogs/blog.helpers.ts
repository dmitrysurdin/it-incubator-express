import { BlogClientModel, BlogModel } from './blog.types';
import { WithId } from 'mongodb';

export const mapBlogFromDb = (blogDb: WithId<BlogModel>): BlogClientModel => {
	return {
		id: blogDb._id.toString(),
		name: blogDb.name,
		description: blogDb.description,
		websiteUrl: blogDb.websiteUrl,
		isMembership: blogDb.isMembership,
		createdAt: blogDb.createdAt,
	};
};

export const mapBlogsFromDb = (blogsDb: Array<WithId<BlogModel>>): Array<BlogClientModel> => {
	return blogsDb.map(mapBlogFromDb);
};
