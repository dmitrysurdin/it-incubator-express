import { body } from 'express-validator';

const loginOrEmailValidator = body('loginOrEmail')
	.isString()
	.withMessage('Should be a string')
	.trim();

const passwordValidator = body('password')
	.isString()
	.withMessage('Should be a string')
	.trim()
	.isLength({ min: 6, max: 20 })
	.withMessage('Invalid length');

export const authInputValidators = [loginOrEmailValidator, passwordValidator];
