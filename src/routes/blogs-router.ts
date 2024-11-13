import { Router } from 'express';
import { blogControllers } from '../entities/blogs/blog.controller';
import { blogInputValidators } from '../entities/blogs/middlewares';
import { inputCheckErrorsMiddleware } from '../middlewares/inputCheckErrorsMiddleware';

export const blogsRouter = Router();

blogsRouter.get('/', blogControllers.getAll);
blogsRouter.get('/:id', blogControllers.findById);
blogsRouter.post('/', blogInputValidators, inputCheckErrorsMiddleware, blogControllers.create);
blogsRouter.put('/:id', blogInputValidators, inputCheckErrorsMiddleware, blogControllers.update);
blogsRouter.delete('/:id', blogControllers.remove);
