import { Request, Response } from 'express';
import { testingRepositories } from './testing.repository';

export const clearDb = async (req: Request, res: Response): Promise<void> => {
	await testingRepositories.clearDb();

	res.sendStatus(204);
};

export const testingControllers = {
	clearDb,
};
