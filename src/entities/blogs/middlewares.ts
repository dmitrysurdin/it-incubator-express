import { body } from 'express-validator';

const nameValidator = body('name')
	.isString()
	.withMessage('Should be a string')
	.trim()
	.isLength({ min: 1, max: 15 })
	.withMessage('Invalid length');

const descriptionValidator = body('description')
	.isString()
	.withMessage('Should be a string')
	.trim()
	.isLength({ min: 1, max: 500 })
	.withMessage('Invalid length');

const websiteUrlValidator = body('websiteUrl')
	.isString()
	.withMessage('Should be a string')
	.trim()
	.matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/)
	.withMessage('Invalid URL format')
	.isLength({ min: 1, max: 100 })
	.withMessage('Invalid length');

export const blogInputValidators = [nameValidator, descriptionValidator, websiteUrlValidator];
