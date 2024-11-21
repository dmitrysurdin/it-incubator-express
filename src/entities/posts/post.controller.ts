import { Request, Response } from 'express';
import { postRepositories } from './post.repository';
import { PostClientModel } from './post.types';
import { mapPostFromDb, mapPostsFromDb } from './post.helpers';
import { blogRepositories } from '../blogs/blog.repository';

export const create = async (req: Request, res: Response): Promise<void> => {
	const blog = await blogRepositories.findById(req.body.blogId);
	const newPost: PostClientModel = {
		...req.body,
		blogName: blog?.name,
		createdAt: new Date().toISOString(),
	};

	const errorsMessages: any = [];

	if (errorsMessages.length) {
		res.status(400).json({ errorsMessages });
	}

	const createdId = await postRepositories.create(newPost);

	res.status(201).json({ ...newPost, id: createdId });
};

export const remove = async (req: Request, res: Response): Promise<void> => {
	const id = req.params.id;
	const isDeleted = await postRepositories.remove(id);

	if (!isDeleted) {
		res.sendStatus(404);
	}

	res.sendStatus(204);
};

export const findById = async (req: Request, res: Response): Promise<void> => {
	const id = req.params.id;
	const postFromDb = await postRepositories.findById(id);

	if (!postFromDb) {
		res.sendStatus(404);

		return;
	}

	const postForClient = mapPostFromDb(postFromDb);

	res.status(200).json(postForClient);
};

export const getAll = async (req: Request, res: Response): Promise<void> => {
	const postsFromDb = await postRepositories.getAll();
	const postsForClient = mapPostsFromDb(postsFromDb);

	res.status(200).json(postsForClient);
};

export const update = async (req: Request, res: Response): Promise<void> => {
	const id = req.params.id;
	const post = req.body;

	const isUpdated = await postRepositories.update(id, post);

	if (isUpdated) {
		res.sendStatus(204);

		return;
	}

	res.sendStatus(404);
};

export const postControllers = {
	getAll,
	findById,
	create,
	update,
	remove,
};
