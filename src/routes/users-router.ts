import { Router } from 'express';
import { inputCheckErrorsMiddleware } from '../middlewares/inputCheckErrorsMiddleware';
import { userControllers } from '../entities/users/user.controller';
import { userInputValidators } from '../entities/users/middlewares';
import { basicAuthMiddleware } from '../middlewares/authMiddleware';
import { mongoIdParamsValidator, paginationQueryValidator } from '../middlewares/validators';
import { searchEmailTermValidator, searchLoginTermValidator } from '../entities/users/validators';

export const usersRouter = Router();

usersRouter.post(
	'/',
	basicAuthMiddleware,
	userInputValidators,
	inputCheckErrorsMiddleware,
	userControllers.create,
);
usersRouter.get(
	'/',
	basicAuthMiddleware,
	[...paginationQueryValidator, searchLoginTermValidator, searchEmailTermValidator],
	inputCheckErrorsMiddleware,
	userControllers.getAll,
);
usersRouter.delete(
	'/:id',
	basicAuthMiddleware,
	mongoIdParamsValidator,
	inputCheckErrorsMiddleware,
	userControllers.remove,
);
