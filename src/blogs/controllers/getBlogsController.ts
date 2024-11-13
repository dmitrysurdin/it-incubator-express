import { Request, Response } from 'express';
import { blogRepository } from '../repositories/blogRepository';

export const getBlogsController = (req: Request, res: Response): void => {
	const blogs = blogRepository.getBlogs();

	res.status(200).json(blogs);
};
