import { Request, Response, NextFunction } from 'express';
import { SETTINGS } from '../settings';

const ADMIN_AUTH = `${SETTINGS.LOGIN}:${SETTINGS.PASSWORD}`;

const BASIC = 'Basic';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
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
