import { Request, Response } from 'express';
import { blogRepository } from '../repositories/blogRepository';

export const clearBlogsController = (req: Request, res: Response): void => {
	blogRepository.clearBlogs();

	res.sendStatus(204);
};
