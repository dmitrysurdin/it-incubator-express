import { Request, Response } from 'express';
import { userServices } from './user.service';
import { UserClientModel } from './user.types';

const create = async (req: Request, res: Response): Promise<void> => {
	try {
		const createdUser: UserClientModel = await userServices.create(req.body);

		res.status(201).json(createdUser);

		return;
	} catch (error) {
		res.status(400).json(error);

		return;
	}
};

const getAll = async (req: Request, res: Response): Promise<void> => {
	const query: {
		pageSize?: string;
		pageNumber?: string;
		sortDirection?: string;
		sortBy?: string;
		searchLoginTerm?: string;
		searchEmailTerm?: string;
	} = req.query;

	const result = await userServices.getAll({
		pageSize: query?.pageSize,
		pageNumber: query?.pageNumber,
		sortDirection: query?.sortDirection,
		sortBy: query?.sortBy,
		searchLoginTerm: query?.searchLoginTerm,
		searchEmailTerm: query?.searchEmailTerm,
	});

	res.status(200).json(result);
};

const remove = async (req: Request, res: Response): Promise<void> => {
	const isDeleted = await userServices.remove(req.params.id);

	if (!isDeleted) {
		res.sendStatus(404);
	}

	res.sendStatus(204);
};

export const userControllers = {
	create,
	getAll,
	remove,
};
