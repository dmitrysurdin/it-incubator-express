import { NextFunction, Request, Response } from 'express';
import { apiLogsRepositories } from '../services/apiLogs/apiLogs.repository';

const REQUEST_LIMIT_COUNT = 5;

export const rateLimiterMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	const logEntry = {
		ip: req.ip ?? '',
		url: req.originalUrl || req.baseUrl,
		date: new Date(),
	};

	try {
		await apiLogsRepositories.addApiLog(logEntry);

		const tenSecondsAgo = new Date(Date.now() - 10000);

		const requestLogsCount = await apiLogsRepositories.getApiLogsWithinTheDate(
			logEntry.ip,
			logEntry.url,
			tenSecondsAgo,
		);

		if (requestLogsCount > REQUEST_LIMIT_COUNT) {
			res.sendStatus(429);

			return;
		}

		next();
	} catch (e) {
		res.status(500).send('Internal Server Error');
	}
};
