import { body } from 'express-validator';

const loginValidator = body('login')
	.isString()
	.withMessage('Should be a string')
	.trim()
	.isLength({ min: 3, max: 10 })
	.withMessage('Invalid length')
	.matches(/^[a-zA-Z0-9_-]*$/)
	.withMessage('Login can only include letters, numbers, "_" and "-".');

const emailValidator = body('email')
	.isString()
	.withMessage('Should be a string')
	.trim()
	.matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
	.withMessage('Must be a valid email address (e.g., example@example.com).');

const passwordValidator = body('password')
	.isString()
	.withMessage('Should be a string')
	.trim()
	.isLength({ min: 6, max: 20 })
	.withMessage('Invalid length');

export const userInputValidators = [loginValidator, emailValidator, passwordValidator];
