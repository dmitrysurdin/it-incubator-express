import { Request, Response } from 'express';
import { blogRepository } from '../repositories/blogRepository';

export const deleteBlogController = (req: Request, res: Response): void => {
	const id = req.params.id;
	const isDeleted = blogRepository.removeBlog(id);

	if (!isDeleted) {
		res.sendStatus(404);
	}

	res.sendStatus(204);
};
