import { Router } from 'express';
import { blogControllers } from '../entities/blogs/blog.controller';
import { blogInputCheckErrorsMiddleware, blogInputValidators } from '../entities/blogs/middlewares';

export const blogsRouter = Router();

blogsRouter.get('/', blogControllers.getAll);
blogsRouter.get('/:id', blogControllers.findById);
blogsRouter.post('/', blogInputValidators, blogInputCheckErrorsMiddleware, blogControllers.create);
blogsRouter.put(
	'/:id',
	blogInputValidators,
	blogInputCheckErrorsMiddleware,
	blogControllers.update,
);
blogsRouter.delete('/:id', blogControllers.remove);
