import { Request, Response } from 'express';
import { commentServices } from './comment.service';
import { LikeStatus } from '../../types/types';

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

	const currentComment = await commentServices.findById(id);

	if (!currentComment) {
		res.sendStatus(404);

		return;
	}

	if (currentComment.commentatorInfo.userId !== req.userId) {
		res.sendStatus(403);

		return;
	}

	const isUpdated = await commentServices.update({
		id,
		content: newCommentData.content,
		commentatorInfo: currentComment.commentatorInfo,
		createdAt: currentComment.createdAt,
	});

	if (!isUpdated) {
		res.sendStatus(404);

		return;
	}

	res.sendStatus(204);
};

const remove = async (req: Request, res: Response): Promise<void> => {
	const id = req.params.commentId;
	const currentComment = await commentServices.findById(id);

	if (!currentComment) {
		res.sendStatus(404);

		return;
	}

	if (currentComment.commentatorInfo.userId !== req.userId) {
		res.sendStatus(403);

		return;
	}

	const isDeleted = await commentServices.remove(req.params.commentId);

	if (!isDeleted) {
		res.sendStatus(404);

		return;
	}

	res.sendStatus(204);
};

const updateLikeStatus = async (req: Request, res: Response): Promise<void> => {
	const { commentId } = req.params;
	const { likeStatus } = req.body;

	if (!Object.values(LikeStatus).includes(likeStatus)) {
		res.sendStatus(400);
		return;
	}

	const comment = await commentServices.findById(commentId);
	if (!comment) {
		res.sendStatus(404);
		return;
	}

	const isUpdated = await commentServices.updateLikeStatus(commentId, likeStatus);

	if (!isUpdated) {
		res.sendStatus(400);
		return;
	}

	res.sendStatus(204);
};

export const commentControllers = {
	findById,
	update,
	remove,
	updateLikeStatus,
};
