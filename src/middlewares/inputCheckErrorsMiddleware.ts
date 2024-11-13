import { NextFunction, Request, Response } from 'express';
import { ValidationError, validationResult } from 'express-validator';

export const inputCheckErrorsMiddleware = (
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
