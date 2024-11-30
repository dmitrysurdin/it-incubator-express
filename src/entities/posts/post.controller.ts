import { Request, Response } from 'express';
import { postRepositories } from './post.repository';
import { postServices } from './post.service';

export const create = async (req: Request, res: Response): Promise<void> => {
	const createdPost = await postServices.create(req.body);

	if (!createdPost) {
		res.sendStatus(404);

		return;
	}

	res.status(201).json(createdPost);
};

export const getAll = async (req: Request, res: Response): Promise<void> => {
	const query: {
		pageSize?: string;
		pageNumber?: string;
		sortDirection?: string;
		sortBy?: string;
		searchNameTerm?: string;
	} = req.query;

	const result = await postServices.getAll({
		pageSize: query?.pageSize,
		pageNumber: query?.pageNumber,
		sortDirection: query?.sortDirection,
		sortBy: query?.sortBy,
		searchNameTerm: query?.searchNameTerm,
	});

	res.status(200).json(result);
};

export const findById = async (req: Request, res: Response): Promise<void> => {
	const foundPost = await postServices.findById(req.params.id);

	if (!foundPost) {
		res.sendStatus(404);

		return;
	}

	res.status(200).json(foundPost);
};

export const update = async (req: Request, res: Response): Promise<void> => {
	const id = req.params.id;
	const post = req.body;

	const isUpdated = await postRepositories.update(id, post);

	if (!isUpdated) {
		res.sendStatus(404);

		return;
	}

	res.sendStatus(204);
};

export const remove = async (req: Request, res: Response): Promise<void> => {
	const isDeleted = await postServices.remove(req.params.id);

	if (!isDeleted) {
		res.sendStatus(404);
	}

	res.sendStatus(204);
};

export const postControllers = {
	getAll,
	findById,
	create,
	update,
	remove,
};
