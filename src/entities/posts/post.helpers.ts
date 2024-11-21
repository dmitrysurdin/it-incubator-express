import { WithId } from 'mongodb';
import { PostClientModel, PostModel } from './post.types';

export const mapPostFromDb = (postDb: WithId<PostModel>): PostClientModel => {
	return {
		id: postDb._id.toString(),
		title: postDb.title,
		shortDescription: postDb.shortDescription,
		content: postDb.content,
		blogId: postDb.blogId,
		blogName: postDb.blogName,
	};
};

export const mapPostsFromDb = (postsDb: Array<WithId<PostModel>>): Array<PostClientModel> => {
	return postsDb.map(mapPostFromDb);
};
