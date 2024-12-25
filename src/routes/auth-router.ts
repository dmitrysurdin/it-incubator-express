import { Router } from 'express';
import { inputCheckErrorsMiddleware } from '../middlewares/inputCheckErrorsMiddleware';
import { authInputValidators } from '../entities/auth/middlewares';
import { authControllers } from '../entities/auth/auth.controller';
import { bearerAuthMiddleware } from '../middlewares/authMiddleware';
import { codeValidator, emailValidator, userInputValidators } from '../entities/users/middlewares';

export const authRouter = Router();

authRouter.post('/login', authInputValidators, inputCheckErrorsMiddleware, authControllers.login);
authRouter.post(
	'/registration',
	userInputValidators,
	inputCheckErrorsMiddleware,
	authControllers.register,
);
authRouter.post(
	'/registration-email-resending',
	[emailValidator],
	inputCheckErrorsMiddleware,
	authControllers.resendConfirmationEmail,
);
authRouter.post(
	'/registration-confirmation',
	[codeValidator],
	inputCheckErrorsMiddleware,
	authControllers.confirmRegistration,
);
authRouter.get('/me', bearerAuthMiddleware, authControllers.me);
