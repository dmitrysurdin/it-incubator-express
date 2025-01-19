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

export const emailValidator = body('email')
	.isString()
	.withMessage('Should be a string')
	.trim()
	.matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
	.withMessage('Must be a valid email address (e.g., example@example.com).');

export const recoveryCodeValidator = body('recoveryCode')
	.isString()
	.withMessage('Should be a string')
	.trim();

const newPasswordValidator = body('newPassword')
	.isString()
	.withMessage('Should be a string')
	.trim()
	.isLength({ min: 6, max: 20 })
	.withMessage('Invalid length');

export const authInputValidators = [loginOrEmailValidator, passwordValidator];
export const recoveryPasswordInputValidators = [newPasswordValidator, recoveryCodeValidator];
