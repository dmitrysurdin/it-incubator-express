import { Request, Response } from 'express';
import { blogRepositories } from './blog.repository';
import { blogServices } from './blog.service';

export const create = async (req: Request, res: Response): Promise<void> => {
	const createdBlog = await blogServices.create(req.body);

	res.status(201).json(createdBlog);
};

export const getAll = async (req: Request, res: Response): Promise<void> => {
	const query: {
		pageSize?: string;
		pageNumber?: string;
		sortDirection?: string;
		sortBy?: string;
		searchNameTerm?: string;
	} = req.query;

	const result = await blogServices.getAll({
		pageSize: query?.pageSize,
		pageNumber: query?.pageNumber,
		sortDirection: query?.sortDirection,
		sortBy: query?.sortBy,
		searchNameTerm: query?.searchNameTerm,
	});

	res.status(200).json(result);
};

export const findById = async (req: Request, res: Response): Promise<void> => {
	const foundBlog = await blogServices.findById(req.params.id);

	if (!foundBlog) {
		res.sendStatus(404);

		return;
	}

	res.status(200).json(foundBlog);
};

export const update = async (req: Request, res: Response): Promise<void> => {
	const id = req.params.id;
	const blog = req.body;

	const isUpdated = await blogServices.update(id, blog);

	if (!isUpdated) {
		res.sendStatus(404);

		return;
	}

	res.sendStatus(204);
};

export const remove = async (req: Request, res: Response): Promise<void> => {
	const isDeleted = await blogRepositories.remove(req.params.id);

	if (!isDeleted) {
		res.sendStatus(404);
	}

	res.sendStatus(204);
};

export const blogControllers = {
	getAll,
	findById,
	create,
	update,
	remove,
};
