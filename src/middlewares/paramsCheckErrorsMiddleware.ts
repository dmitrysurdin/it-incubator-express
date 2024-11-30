import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const paramsCheckErrorsMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	const errorResult = validationResult(req).array({ onlyFirstError: true });

	if (errorResult.length) {
		res.sendStatus(404);
		return;
	}

	next();
};
