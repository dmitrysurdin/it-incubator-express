import { Router } from 'express';
import { postControllers } from '../entities/posts/post.controller';
import { commentInputValidators, postInputValidators } from '../entities/posts/middlewares';
import { inputCheckErrorsMiddleware } from '../middlewares/inputCheckErrorsMiddleware';
import {
	basicAuthMiddleware,
	bearerAuthMiddleware,
	softBearerAuthMiddleware,
} from '../middlewares/authMiddleware';
import {
	mongoIdParamsValidator,
	mongoPostIdParamsValidator,
	paginationQueryValidator,
} from '../middlewares/validators';
import { searchNameTermValidator } from '../entities/posts/validators';

export const postsRouter = Router();

postsRouter.get(
	'/',
	softBearerAuthMiddleware,
	[...paginationQueryValidator, searchNameTermValidator],
	inputCheckErrorsMiddleware,
	postControllers.getAll,
);
postsRouter.get(
	'/:id',
	softBearerAuthMiddleware,
	mongoIdParamsValidator,
	inputCheckErrorsMiddleware,
	postControllers.findById,
);
postsRouter.post(
	'/',
	basicAuthMiddleware,
	postInputValidators,
	inputCheckErrorsMiddleware,
	postControllers.create,
);
postsRouter.put(
	'/:id',
	basicAuthMiddleware,
	postInputValidators,
	mongoIdParamsValidator,
	inputCheckErrorsMiddleware,
	postControllers.update,
);
postsRouter.delete(
	'/:id',
	basicAuthMiddleware,
	mongoIdParamsValidator,
	inputCheckErrorsMiddleware,
	postControllers.remove,
);
postsRouter.post(
	'/:postId/comments',
	bearerAuthMiddleware,
	mongoPostIdParamsValidator,
	commentInputValidators,
	inputCheckErrorsMiddleware,
	postControllers.createCommentForPost,
);
postsRouter.put(
	'/:postId/like-status',
	bearerAuthMiddleware,
	mongoPostIdParamsValidator,
	postControllers.updateLikeStatus,
);
postsRouter.get(
	'/:postId/comments',
	softBearerAuthMiddleware,
	mongoPostIdParamsValidator,
	[...paginationQueryValidator],
	postControllers.getAllCommentsForPost,
);
