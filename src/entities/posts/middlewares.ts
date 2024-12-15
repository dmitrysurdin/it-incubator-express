import { body } from 'express-validator';
import { blogRepositories } from '../blogs/blog.repository';

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

const blogIdValidator = body('blogId')
	.isString()
	.withMessage('Invalid blogId')
	.custom(async (id: string) => {
		const blog = await blogRepositories.findById(id);

		if (!blog) {
			throw new Error('Blog with this id does not exist');
		}
	});

const commentContentValidator = body('content')
	.isString()
	.withMessage('Invalid format')
	.trim()
	.isLength({ min: 20, max: 300 })
	.withMessage('comment is too short or too long');

export const commentInputValidators = [commentContentValidator];

export const postInputValidators = [
	titleValidator,
	shortDescriptionValidator,
	contentValidator,
	blogIdValidator,
];
