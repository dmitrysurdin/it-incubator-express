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

const register = async (req: Request, res: Response): Promise<void> => {
	try {
		const isCreated = await authServices.register(req.body);

		if (!isCreated) {
			res.sendStatus(500);

			return;
		}

		res.sendStatus(204);

		return;
	} catch (error) {
		res.status(400).json(error);

		return;
	}
};

const resendConfirmationEmail = async (req: Request, res: Response): Promise<void> => {
	try {
		await authServices.resendConfirmationEmail(req.body.email);

		res.sendStatus(204);

		return;
	} catch (error) {
		res.status(400).json(error);

		return;
	}
};

const confirmRegistration = async (req: Request, res: Response): Promise<void> => {
	try {
		const isSucceed = await authServices.confirmRegistration(req.body.code);

		if (!isSucceed) {
			res.sendStatus(500);

			return;
		}

		res.sendStatus(204);

		return;
	} catch (error) {
		res.status(400).json(error);

		return;
	}
};

export const authControllers = {
	login,
	me,
	register,
	resendConfirmationEmail,
	confirmRegistration,
};
