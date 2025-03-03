import { Router } from 'express';
import { inputCheckErrorsMiddleware } from '../middlewares/inputCheckErrorsMiddleware';
import { bearerAuthMiddleware, softBearerAuthMiddleware } from '../middlewares/authMiddleware';
import { mongoCommentIdParamsValidator, mongoIdParamsValidator } from '../middlewares/validators';
import { commentControllers } from '../entities/comments/comment.controller';
import { commentInputValidators } from '../entities/comments/middlewares';

export const commentsRouter = Router();

commentsRouter.get(
	'/:id',
	softBearerAuthMiddleware,
	mongoIdParamsValidator,
	commentControllers.findById,
);
commentsRouter.put(
	'/:commentId',
	bearerAuthMiddleware,
	mongoCommentIdParamsValidator,
	commentInputValidators,
	inputCheckErrorsMiddleware,
	commentControllers.update,
);
commentsRouter.put(
	'/:commentId/like-status',
	bearerAuthMiddleware,
	mongoCommentIdParamsValidator,
	commentControllers.updateLikeStatus,
);
commentsRouter.delete(
	'/:commentId',
	bearerAuthMiddleware,
	mongoCommentIdParamsValidator,
	commentControllers.remove,
);
