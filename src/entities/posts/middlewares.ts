import { body } from 'express-validator';

const titleValidator = body('title')
	.isString()
	.withMessage('Invalid format')
	.trim()
	.isLength({ min: 1, max: 30 })
	.withMessage('Invalid length');

const shortDescriptionValidator = body('shortDescription')
	.isString()
	.withMessage('Should be a string')
	.trim()
	.isLength({ min: 1, max: 100 })
	.withMessage('Invalid length');

const contentValidator = body('content')
	.isString()
	.withMessage('Should be a string')
	.trim()
	.isLength({ min: 1, max: 1000 })
	.withMessage('Invalid length');

const blogIdValidator = body('blogId').isString().withMessage('Invalid blogId');

const nameValidator = body('name').isString().isLength({ max: 15 }).withMessage('Invalid name');

export const postInputValidators = [
	titleValidator,
	shortDescriptionValidator,
	contentValidator,
	blogIdValidator,
	nameValidator,
];
