import { Router } from 'express';
import { blogControllers } from '../entities/blogs/blog.controller';
import {
	blogIdParamValidator,
	blogInputValidators,
	postForABlogInputValidators,
} from '../entities/blogs/middlewares';
import { inputCheckErrorsMiddleware } from '../middlewares/inputCheckErrorsMiddleware';
import { basicAuthMiddleware } from '../middlewares/authMiddleware';
import { mongoIdParamsValidator, paginationQueryValidator } from '../middlewares/validators';
import { paramsCheckErrorsMiddleware } from '../middlewares/paramsCheckErrorsMiddleware';
import { searchNameTermValidator } from '../entities/blogs/validators';

export const blogsRouter = Router();

blogsRouter.get(
	'/',
	[...paginationQueryValidator, searchNameTermValidator],
	inputCheckErrorsMiddleware,
	blogControllers.getAll,
);
blogsRouter.get(
	'/:blogId/posts',
	blogIdParamValidator,
	paramsCheckErrorsMiddleware,
	[...paginationQueryValidator, searchNameTermValidator],
	inputCheckErrorsMiddleware,
	blogControllers.getAllPostsByBlogId,
);
blogsRouter.get(
	'/:id',
	mongoIdParamsValidator,
	inputCheckErrorsMiddleware,
	blogControllers.findById,
);

blogsRouter.post(
	'/',
	basicAuthMiddleware,
	blogInputValidators,
	inputCheckErrorsMiddleware,
	blogControllers.create,
);
blogsRouter.post(
	'/:blogId/posts',
	basicAuthMiddleware,
	blogIdParamValidator,
	paramsCheckErrorsMiddleware,
	postForABlogInputValidators,
	inputCheckErrorsMiddleware,
	blogControllers.createPostForBlog,
);
blogsRouter.put(
	'/:id',
	basicAuthMiddleware,
	blogInputValidators,
	mongoIdParamsValidator,
	inputCheckErrorsMiddleware,
	blogControllers.update,
);
blogsRouter.delete(
	'/:id',
	basicAuthMiddleware,
	mongoIdParamsValidator,
	inputCheckErrorsMiddleware,
	blogControllers.remove,
);
