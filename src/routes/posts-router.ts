import { Router } from 'express';
import { postControllers } from '../entities/posts/post.controller';
import { postInputValidators } from '../entities/posts/middlewares';
import { inputCheckErrorsMiddleware } from '../middlewares/inputCheckErrorsMiddleware';
import { authMiddleware } from '../middlewares/authMiddleware';
import { mongoIdParamsValidator } from '../middlewares/validators';

export const postsRouter = Router();

postsRouter.get('/', postControllers.getAll);
postsRouter.get('/:id', postControllers.findById);
postsRouter.post(
	'/',
	authMiddleware,
	postInputValidators,
	inputCheckErrorsMiddleware,
	postControllers.create,
);
postsRouter.put(
	'/:id',
	authMiddleware,
	postInputValidators,
	mongoIdParamsValidator,
	inputCheckErrorsMiddleware,
	postControllers.update,
);
postsRouter.delete(
	'/:id',
	authMiddleware,
	mongoIdParamsValidator,
	inputCheckErrorsMiddleware,
	postControllers.remove,
);
