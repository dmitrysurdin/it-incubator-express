import { Router } from 'express';
import { postControllers } from '../entities/posts/post.controller';
import { postInputValidators } from '../entities/posts/middlewares';
import { inputCheckErrorsMiddleware } from '../middlewares/inputCheckErrorsMiddleware';
import { authMiddleware } from '../middlewares/authMiddleware';

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
	inputCheckErrorsMiddleware,
	postControllers.update,
);
postsRouter.delete('/:id', authMiddleware, postControllers.remove);
