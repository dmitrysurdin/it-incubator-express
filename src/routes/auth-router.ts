import { Router } from 'express';
import { inputCheckErrorsMiddleware } from '../middlewares/inputCheckErrorsMiddleware';
import {
	authInputValidators,
	emailValidator,
	recoveryPasswordInputValidators,
} from '../entities/auth/middlewares';
import { authControllers } from '../entities/auth/auth.controller';
import { bearerAuthMiddleware, refreshTokenAuthMiddleware } from '../middlewares/authMiddleware';
import { codeValidator, userInputValidators } from '../entities/users/middlewares';
import { rateLimiterMiddleware } from '../middlewares/rateLimiterMiddleware';

export const authRouter = Router();

authRouter.post(
	'/login',
	rateLimiterMiddleware,
	authInputValidators,
	inputCheckErrorsMiddleware,
	authControllers.login,
);
authRouter.post('/refresh-token', refreshTokenAuthMiddleware, authControllers.refreshToken);
authRouter.post('/logout', refreshTokenAuthMiddleware, authControllers.logout);
authRouter.post(
	'/registration',
	rateLimiterMiddleware,
	userInputValidators,
	inputCheckErrorsMiddleware,
	authControllers.register,
);
authRouter.post(
	'/registration-email-resending',
	rateLimiterMiddleware,
	[emailValidator],
	inputCheckErrorsMiddleware,
	authControllers.resendConfirmationEmail,
);
authRouter.post(
	'/registration-confirmation',
	rateLimiterMiddleware,
	[codeValidator],
	inputCheckErrorsMiddleware,
	authControllers.confirmRegistration,
);
authRouter.post(
	'/password-recovery',
	rateLimiterMiddleware,
	[emailValidator],
	inputCheckErrorsMiddleware,
	authControllers.sendPasswordRecovery,
);
authRouter.post(
	'/new-password',
	rateLimiterMiddleware,
	recoveryPasswordInputValidators,
	inputCheckErrorsMiddleware,
	authControllers.confirmNewPassword,
);
authRouter.get('/me', bearerAuthMiddleware, authControllers.me);
