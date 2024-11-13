import { Blog } from './blog.types';
import { Request, Response } from 'express';
import { blogRepositories } from './blog.repository';

export const create = (req: Request, res: Response): void => {
	const newBlog: Blog = {
		...req.body,
		id: Math.floor(Date.now() + Math.random()),
	};

	const errorsMessages: any = [];

	if (errorsMessages.length) {
		res.status(400).json({ errorsMessages });
	}

	blogRepositories.create(newBlog);

	res.status(201).json(newBlog);
};

export const remove = (req: Request, res: Response): void => {
	const id = req.params.id;
	const isDeleted = blogRepositories.remove(id);

	if (!isDeleted) {
		res.sendStatus(404);
	}

	res.sendStatus(204);
};

export const findById = (req: Request, res: Response): void => {
	const id = req.params.id;
	const blog = blogRepositories.findById(id);

	if (!blog) {
		res.sendStatus(404);

		return;
	}

	res.status(200).json(blog);
};

export const getAll = (req: Request, res: Response): void => {
	const blogs = blogRepositories.getAll();

	res.status(200).json(blogs);
};

export const update = (req: Request, res: Response): void => {
	const id = req.params.id;
	const blog = req.body;

	const isUpdated = blogRepositories.update(id, blog);

	if (isUpdated) {
		res.sendStatus(204);

		return;
	}

	res.sendStatus(404);
};

export const blogControllers = {
	getAll,
	findById,
	create,
	update,
	remove,
};
