import { Router } from 'express';
import { postControllers } from '../entities/posts/post.controller';
import { postInputValidators } from '../entities/posts/middlewares';
import { inputCheckErrorsMiddleware } from '../middlewares/inputCheckErrorsMiddleware';

export const postsRouter = Router();

postsRouter.get('/', postControllers.getAll);
postsRouter.get('/:id', postControllers.findById);
postsRouter.post('/', postInputValidators, inputCheckErrorsMiddleware, postControllers.create);
postsRouter.put('/:id', postInputValidators, inputCheckErrorsMiddleware, postControllers.update);
postsRouter.delete('/:id', postControllers.remove);
