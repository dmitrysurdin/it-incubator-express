import { Request, Response } from 'express';
import { authServices } from './auth.service';
import { authRepositories } from './auth.repository';

const login = async (req: Request, res: Response): Promise<void> => {
	const isValid = await authServices.login(req.body);

	if (!isValid) {
		res.sendStatus(401);

		return;
	}

	try {
		const user = await authRepositories.findUserByLoginOrEmail(req.body.loginOrEmail);

		const accessToken = authServices.createJWT(user!._id.toString());
		res.status(200).json({ accessToken });

		return;
	} catch (error) {
		res.sendStatus(500);

		return;
	}
};

const me = async (req: Request, res: Response): Promise<void> => {
	const user = await authServices.getUserById(req.userId);

	if (!user) {
		res.sendStatus(401);

		return;
	}

	res.status(200).json(user);
};

export const authControllers = {
	login,
	me,
};
