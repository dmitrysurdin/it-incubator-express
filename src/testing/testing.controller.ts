import { Request, Response } from 'express';
import { testingRepositories } from './testing.repository';

export const clearDb = (req: Request, res: Response): void => {
	testingRepositories.clearDb();

	res.sendStatus(204);
};

export const testingControllers = {
	clearDb,
};
