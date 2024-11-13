import { body, ValidationError, validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';

const nameValidator = body('name').isString().isLength({ max: 15 }).withMessage('Invalid name');

const descriptionValidator = body('description')
	.isString()
	.isLength({ max: 500 })
	.withMessage('Invalid Description');

const websiteUrlValidator = body('websiteUrl')
	.isString()
	.matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/)
	.isLength({ max: 100 })
	.withMessage('Invalid Website URL');

export const blogInputValidators = [nameValidator, descriptionValidator, websiteUrlValidator];

export const blogInputCheckErrorsMiddleware = (
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
