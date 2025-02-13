import { NextFunction, Request, Response } from 'express';
import { SETTINGS } from '../settings';
import { authServices } from '../entities/auth/auth.service';

const ADMIN_AUTH = `${SETTINGS.LOGIN}:${SETTINGS.PASSWORD}`;

const BASIC = 'Basic';

export const basicAuthMiddleware = (req: Request, res: Response, next: NextFunction): void => {
	const auth = req.headers['authorization'];

	if (!auth) {
		res.sendStatus(401);
		return;
	}

	const slicedBasic = auth.slice(0, 5);
	const encodedAuthFromReq = auth.slice(6);

	const buff = Buffer.from(ADMIN_AUTH, 'utf8');
	const encodedExpectedAuth = buff.toString('base64');

	if (encodedAuthFromReq !== encodedExpectedAuth || slicedBasic !== BASIC) {
		res.sendStatus(401);
		return;
	}

	next();
};

export const bearerAuthMiddleware = (req: Request, res: Response, next: NextFunction): void => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		res.sendStatus(401);

		return;
	}

	const token = authHeader.split(' ')[1];

	try {
		req.userId = authServices.getUserIdByToken(token);
		next();
	} catch (error) {
		res.sendStatus(401);

		return;
	}
};

export const softBearerAuthMiddleware = (req: Request, res: Response, next: NextFunction): void => {
	const authHeader = req.headers.authorization;

	const token = authHeader?.split(' ')[1];

	req.userId = token ? authServices.getUserIdByToken(token) : null;
	next();
};

export const refreshTokenAuthMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	const refreshToken = req.cookies.refreshToken;

	if (!refreshToken) {
		res.sendStatus(401);

		return;
	}

	try {
		const isTokenValid = await authServices.validateRefreshToken(refreshToken);

		if (!isTokenValid) {
			res.sendStatus(401);

			return;
		}

		const refreshTokenPayload = await authServices.getTokenPayload(refreshToken);
		const userId = refreshTokenPayload?.userId;

		if (!userId) {
			res.sendStatus(401);

			return;
		}

		req.userId = userId;
		next();
	} catch (e) {
		res.sendStatus(401);

		return;
	}
};
