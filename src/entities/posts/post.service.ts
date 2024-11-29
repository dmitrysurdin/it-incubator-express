import { PostClientModel, PostModel } from './post.types';
import { blogRepositories } from '../blogs/blog.repository';
import { postRepositories } from './post.repository';
import { mapPostFromDb, mapPostsFromDb } from './post.helpers';

const create = async (post: PostModel): Promise<PostClientModel | null> => {
	const blog = await blogRepositories.findById(post.blogId);

	if (!blog) {
		return null;
	}

	const newPost: PostModel = {
		...post,
		blogName: blog?.name,
		createdAt: new Date().toISOString(),
	};

	const createdId = await postRepositories.create(newPost);

	return { ...newPost, id: createdId };
};

const getAll = async (): Promise<Array<PostClientModel>> => {
	const postsFromDb = await postRepositories.getAll();

	return mapPostsFromDb(postsFromDb);
};

const findById = async (id: string): Promise<PostClientModel | null> => {
	const postFromDb = await postRepositories.findById(id);

	if (!postFromDb) {
		return null;
	}

	return mapPostFromDb(postFromDb);
};

const update = async (id: string, updatedPost: PostModel): Promise<boolean> => {
	return await postRepositories.update(id, updatedPost);
};

const remove = async (id: string): Promise<boolean> => {
	return await postRepositories.remove(id);
};

export const postServices = {
	create,
	getAll,
	findById,
	update,
	remove,
};
