import { body, param } from 'express-validator';
import { blogRepositories } from './blog.repository';

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

const blogIdValidator = param('blogId')
	.isString()
	.withMessage('Invalid blogId')
	.custom(async (id: string) => {
		const blog = await blogRepositories.findById(id);

		if (!blog) {
			throw new Error('Blog with this id does not exist');
		}
	});

export const postForABlogInputValidators = [
	titleValidator,
	shortDescriptionValidator,
	contentValidator,
];
export const blogInputValidators = [nameValidator, descriptionValidator, websiteUrlValidator];
export const blogIdParamValidator = [blogIdValidator];
