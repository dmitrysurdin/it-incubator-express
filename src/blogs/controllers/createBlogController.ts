import { Request, Response } from 'express';
import { blogRepository } from '../repositories/blogRepository';
import { validateVideoFields } from '../validation/validation';
import { Blog } from '../types/blog.types';

export const createBlogController = (req: Request, res: Response): void => {
	const newBlog: Blog = {
		...req.body,
		id: Math.floor(Date.now() + Math.random()),
	};

	const errorsMessages = validateVideoFields(newBlog);

	if (errorsMessages.length) {
		res.status(400).json({ errorsMessages });
	}

	blogRepository.createBlog(newBlog);

	res.status(201).json(newBlog);
};
