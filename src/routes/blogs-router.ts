import { Router } from 'express';
import { blogControllers } from '../entities/blogs/blog.controller';
import { blogInputValidators } from '../entities/blogs/middlewares';
import { inputCheckErrorsMiddleware } from '../middlewares/inputCheckErrorsMiddleware';
import { authMiddleware } from '../middlewares/authMiddleware';
import { mongoIdParamsValidator } from '../middlewares/validators';

export const blogsRouter = Router();

blogsRouter.get('/', blogControllers.getAll);
blogsRouter.get('/:id', blogControllers.findById);
blogsRouter.post(
	'/',
	authMiddleware,
	blogInputValidators,
	inputCheckErrorsMiddleware,
	blogControllers.create,
);
blogsRouter.put(
	'/:id',
	authMiddleware,
	blogInputValidators,
	mongoIdParamsValidator,
	inputCheckErrorsMiddleware,
	blogControllers.update,
);
blogsRouter.delete(
	'/:id',
	authMiddleware,
	mongoIdParamsValidator,
	inputCheckErrorsMiddleware,
	blogControllers.remove,
);
