import { Request, Response } from 'express';
import { commentServices } from './comment.service';

export const findById = async (req: Request, res: Response): Promise<void> => {
	const foundComment = await commentServices.findById(req.params.id);

	if (!foundComment) {
		res.sendStatus(404);

		return;
	}

	res.status(200).json(foundComment);
};

const update = async (req: Request, res: Response): Promise<void> => {
	const id = req.params.commentId;
	const newCommentData = req.body;

	const isUpdated = await commentServices.update(id, newCommentData);

	if (!isUpdated) {
		res.sendStatus(404);

		return;
	}

	res.sendStatus(204);
};

const remove = async (req: Request, res: Response): Promise<void> => {
	const isDeleted = await commentServices.remove(req.params.commentId);

	if (!isDeleted) {
		res.sendStatus(404);

		return;
	}

	res.sendStatus(204);
};

export const commentControllers = {
	findById,
	update,
	remove,
};
