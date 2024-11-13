import { body, ValidationError, validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';

const titleValidator = body('title').isString().isLength({ max: 30 }).withMessage('Invalid title');

const shortDescriptionValidator = body('shortDescription')
	.isString()
	.isLength({ max: 100 })
	.withMessage('Invalid short description');

const contentValidator = body('content')
	.isString()
	.isLength({ max: 1000 })
	.withMessage('Invalid content');

const blogIdValidator = body('blogId').isString().withMessage('Invalid blogId');

const nameValidator = body('name').isString().isLength({ max: 15 }).withMessage('Invalid name');

export const postInputValidators = [
	titleValidator,
	shortDescriptionValidator,
	contentValidator,
	blogIdValidator,
	nameValidator,
];

export const postInputCheckErrorsMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	const errorResult = validationResult(req)
		.formatWith((error: ValidationError) => {
			return {
				message: error.msg,
				field: error.type === 'field' ? error.path : null,
			};
		})
		.array({ onlyFirstError: true });

	if (errorResult.length) {
		res.status(400).json({ errorsMessages: errorResult });
		return;
	}

	next();
};
