import { Request, Response } from 'express';
import { postRepositories } from './post.repository';
import { postServices } from './post.service';
import { LikeStatus } from '../../types/types';

const create = async (req: Request, res: Response): Promise<void> => {
	const createdPost = await postServices.create(req.body);

	if (!createdPost) {
		res.sendStatus(404);

		return;
	}

	res.status(201).json(createdPost);
};

const getAll = async (req: Request, res: Response): Promise<void> => {
	const query: {
		pageSize?: string;
		pageNumber?: string;
		sortDirection?: string;
		sortBy?: string;
		searchNameTerm?: string;
	} = req.query;

	const userId = req.userId ?? '';

	const result = await postServices.getAll({
		pageSize: query?.pageSize,
		pageNumber: query?.pageNumber,
		sortDirection: query?.sortDirection,
		sortBy: query?.sortBy,
		searchNameTerm: query?.searchNameTerm,
		userId,
	});

	res.status(200).json(result);
};

export const findById = async (req: Request, res: Response): Promise<void> => {
	const userId = req?.userId ?? '';
	const foundPost = await postServices.findById(req.params.id, userId);

	if (!foundPost) {
		res.sendStatus(404);

		return;
	}

	res.status(200).json(foundPost);
};

const update = async (req: Request, res: Response): Promise<void> => {
	const id = req.params.id;
	const post = req.body;

	const isUpdated = await postRepositories.update(id, post);

	if (!isUpdated) {
		res.sendStatus(404);

		return;
	}

	res.sendStatus(204);
};

const remove = async (req: Request, res: Response): Promise<void> => {
	const isDeleted = await postServices.remove(req.params.id);

	if (!isDeleted) {
		res.sendStatus(404);

		return;
	}

	res.sendStatus(204);
};

const createCommentForPost = async (req: Request, res: Response): Promise<void> => {
	const content = req.body.content;
	const postId = req.params.postId;
	const userId = req.userId;

	const post = await postServices.findById(postId);

	if (!post) {
		res.sendStatus(404);

		return;
	}

	if (!userId) {
		res.sendStatus(401);

		return;
	}

	const newComment = await postServices.createCommentForPost(content, userId, post.id);

	if (!newComment) {
		res.sendStatus(404);

		return;
	}

	res.status(201).json(newComment);
};

const getAllCommentsForPost = async (req: Request, res: Response): Promise<void> => {
	const query: {
		pageSize?: string;
		pageNumber?: string;
		sortDirection?: string;
		sortBy?: string;
	} = req.query;
	const postId = req.params.postId;

	const userId = req?.userId ?? '';

	const post = await postServices.findById(postId);

	if (!post) {
		res.sendStatus(404);

		return;
	}

	const result = await postServices.getAllCommentsForPost({
		pageSize: query?.pageSize,
		pageNumber: query?.pageNumber,
		sortDirection: query?.sortDirection,
		sortBy: query?.sortBy,
		postId: post.id,
		userId,
	});

	res.status(200).json(result);
};

const updateLikeStatus = async (req: Request, res: Response): Promise<void> => {
	const { postId } = req.params;
	const { likeStatus } = req.body;
	const userId = req.userId ?? '';

	if (!Object.values(LikeStatus).includes(likeStatus)) {
		res.status(400).json({
			errorsMessages: [{ message: 'Invalid likeStatus', field: 'likeStatus' }],
		});
		return;
	}

	const post = await postServices.findById(postId);
	if (!post) {
		res.sendStatus(404);
		return;
	}

	await postRepositories.updateLikeStatus(postId, userId, likeStatus);

	res.sendStatus(204);
};

export const postControllers = {
	getAll,
	findById,
	create,
	update,
	remove,
	createCommentForPost,
	getAllCommentsForPost,
	updateLikeStatus,
};
