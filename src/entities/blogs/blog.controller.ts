import { BlogClientModel } from './blog.types';
import { Request, Response } from 'express';
import { blogRepositories } from './blog.repository';
import { mapBlogFromDb, mapBlogsFromDb } from './blog.helpers';

export const create = async (req: Request, res: Response): Promise<void> => {
	const newBlog: BlogClientModel = {
		...req.body,
	};

	const errorsMessages: any = [];

	if (errorsMessages.length) {
		res.status(400).json({ errorsMessages });
	}

	const createdId = await blogRepositories.create(newBlog);

	res.status(201).json({ ...newBlog, id: createdId });
};

export const remove = async (req: Request, res: Response): Promise<void> => {
	const id = req.params.id;
	const isDeleted = await blogRepositories.remove(id);

	if (!isDeleted) {
		res.sendStatus(404);
	}

	res.sendStatus(204);
};

export const findById = async (req: Request, res: Response): Promise<void> => {
	const id = req.params.id;
	const blogFromDb = await blogRepositories.findById(id);

	if (!blogFromDb) {
		res.sendStatus(404);

		return;
	}
	const blogForClient = mapBlogFromDb(blogFromDb);

	res.status(200).json(blogForClient);
};

export const getAll = async (req: Request, res: Response): Promise<void> => {
	const blogsFromDb = await blogRepositories.getAll();
	const blogsForClient = mapBlogsFromDb(blogsFromDb);

	res.status(200).json(blogsForClient);
};

export const update = async (req: Request, res: Response): Promise<void> => {
	const id = req.params.id;
	const blog = req.body;

	const isUpdated = await blogRepositories.update(id, blog);

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
