import { Router } from 'express';
import { inputCheckErrorsMiddleware } from '../middlewares/inputCheckErrorsMiddleware';
import { authInputValidators } from '../entities/auth/middlewares';
import { authControllers } from '../entities/auth/auth.controller';

export const authRouter = Router();

authRouter.post('/login', authInputValidators, inputCheckErrorsMiddleware, authControllers.login);
