import { Request, Response } from 'express';
import { blogRepository } from '../repositories/blogRepository';
import { validateVideoFields } from '../validation/validation';

export const updateBlogController = (req: Request, res: Response): void => {
	const id = req.params.id;
	const blog = req.body;

	const errorsMessages = validateVideoFields(blog);

	if (errorsMessages.length) {
		res.status(400).json({ errorsMessages });
	}

	const isUpdated = blogRepository.updateBlog(id, blog);

	if (isUpdated) {
		res.sendStatus(204);

		return;
	}

	res.sendStatus(404);
};
