import { Request, Response } from 'express';
import { blogServices } from './blog.service';

const create = async (req: Request, res: Response): Promise<void> => {
	const createdBlog = await blogServices.create(req.body);

	res.status(201).json(createdBlog);
};

const createPostForBlog = async (req: Request, res: Response): Promise<void> => {
	const blogId = req.params.blogId;
	const post = req.body;
	const createdPost = await blogServices.createPostForBlog(blogId, post);

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

	const result = await blogServices.getAll({
		pageSize: query?.pageSize,
		pageNumber: query?.pageNumber,
		sortDirection: query?.sortDirection,
		sortBy: query?.sortBy,
		searchNameTerm: query?.searchNameTerm,
	});

	res.status(200).json(result);
};

const getAllPostsByBlogId = async (req: Request, res: Response): Promise<void> => {
	const query: {
		pageSize?: string;
		pageNumber?: string;
		sortDirection?: string;
		sortBy?: string;
		searchNameTerm?: string;
	} = req.query;
	const blogId = req.params.blogId;
	const userId = req.userId ?? '';

	const result = await blogServices.getAllPostsByBlogId({
		blogId,
		pageSize: query?.pageSize,
		pageNumber: query?.pageNumber,
		sortDirection: query?.sortDirection,
		sortBy: query?.sortBy,
		searchNameTerm: query?.searchNameTerm,
		userId,
	});

	res.status(200).json(result);
};

const findById = async (req: Request, res: Response): Promise<void> => {
	const foundBlog = await blogServices.findById(req.params.id);

	if (!foundBlog) {
		res.sendStatus(404);

		return;
	}

	res.status(200).json(foundBlog);
};

const update = async (req: Request, res: Response): Promise<void> => {
	const id = req.params.id;
	const blog = req.body;

	const isUpdated = await blogServices.update(id, blog);

	if (!isUpdated) {
		res.sendStatus(404);

		return;
	}

	res.sendStatus(204);
};

const remove = async (req: Request, res: Response): Promise<void> => {
	const isDeleted = await blogServices.remove(req.params.id);

	if (!isDeleted) {
		res.sendStatus(404);

		return;
	}

	res.sendStatus(204);
};

export const blogControllers = {
	getAll,
	getAllPostsByBlogId,
	findById,
	create,
	createPostForBlog,
	update,
	remove,
};
