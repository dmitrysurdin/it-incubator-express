import { Request, Response } from 'express';
import { blogRepository } from '../repositories/blogRepository';

export const findBlogController = (req: Request, res: Response): void => {
	const id = req.params.id;
	const blog = blogRepository.findBlogById(id);

	if (!blog) {
		res.sendStatus(404);

		return;
	}

	res.status(200).json(blog);
};
