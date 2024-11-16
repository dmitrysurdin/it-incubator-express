import { Request, Response } from 'express';
import { postRepositories } from './post.repository';
import { Post } from './post.types';

export const create = (req: Request, res: Response): void => {
	const newPost: Post = {
		...req.body,
		id: Math.floor(Date.now() + Math.random()).toString(),
	};

	const errorsMessages: any = [];

	if (errorsMessages.length) {
		res.status(400).json({ errorsMessages });
	}

	postRepositories.create(newPost);

	res.status(201).json(newPost);
};

export const remove = (req: Request, res: Response): void => {
	const id = req.params.id;
	const isDeleted = postRepositories.remove(id);

	if (!isDeleted) {
		res.sendStatus(404);
	}

	res.sendStatus(204);
};

export const findById = (req: Request, res: Response): void => {
	const id = req.params.id;
	const post = postRepositories.findById(id);

	if (!post) {
		res.sendStatus(404);

		return;
	}

	res.status(200).json(post);
};

export const getAll = (req: Request, res: Response): void => {
	const posts = postRepositories.getAll();

	res.status(200).json(posts);
};

export const update = (req: Request, res: Response): void => {
	const id = req.params.id;
	const post = req.body;

	const isUpdated = postRepositories.update(id, post);

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
