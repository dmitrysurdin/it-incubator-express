import { body } from 'express-validator';

const commentContentValidator = body('content')
	.isString()
	.withMessage('Invalid format')
	.trim()
	.isLength({ min: 20, max: 300 })
	.withMessage('comment is too short or too long');

export const commentInputValidators = [commentContentValidator];
