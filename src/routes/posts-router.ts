import { Router } from 'express';
import { postControllers } from '../entities/posts/post.controller';
import { postInputCheckErrorsMiddleware, postInputValidators } from '../entities/posts/middlewares';

export const postsRouter = Router();

postsRouter.get('/', postControllers.getAll);
postsRouter.get('/:id', postControllers.findById);
postsRouter.post('/', postInputValidators, postInputCheckErrorsMiddleware, postControllers.create);
postsRouter.put(
	'/:id',
	postInputValidators,
	postInputCheckErrorsMiddleware,
	postControllers.update,
);
postsRouter.delete('/:id', postControllers.remove);
