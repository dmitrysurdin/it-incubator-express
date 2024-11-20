import { dbData } from '../../db/local-db';
import { Post } from './post.types';

const create = (post: Post): void => {
	dbData.posts = [...dbData.posts, post];
};

const getAll = (): Array<Post> => {
	return dbData.posts;
};

const findById = (id: string): Post | undefined => {
	return dbData.posts.find((post) => post?.id === id);
};

const update = (id: string, updatedPost: Omit<Post, 'id'>): boolean => {
	const postIndex = dbData.posts.findIndex((post) => post.id === id);

	if (postIndex === -1) {
		return false;
	}

	dbData.posts[postIndex] = {
		...dbData.posts[postIndex],
		...updatedPost,
	};

	return true;
};

const remove = (id: string): boolean => {
	const post = findById(id);

	if (!post) {
		return false;
	}

	dbData.posts = dbData.posts.filter((post) => post.id !== id);
	return true;
};

export const postRepositories = {
	create,
	getAll,
	findById,
	update,
	remove,
};
