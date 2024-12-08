import { Request, Response } from 'express';
import { authServices } from './auth.service';

const login = async (req: Request, res: Response): Promise<void> => {
	const isValid = await authServices.login(req.body);

	if (!isValid) {
		res.sendStatus(401);

		return;
	}

	res.sendStatus(204);
};

export const authControllers = {
	login,
};
