import { Request, Response } from 'express';
import { authServices } from './auth.service';
import { authRepositories } from './auth.repository';
import { DeviceSessionDbModel } from '../security/devices/devices.types';
import { devicesRepositories } from '../security/devices/devices.repository';
import { v4 as uuidv4 } from 'uuid';

const login = async (req: Request, res: Response): Promise<void> => {
	const isValid = await authServices.login(req.body);

	if (!isValid) {
		res.sendStatus(401);

		return;
	}

	try {
		const user = await authRepositories.findUserByLoginOrEmail(req.body.loginOrEmail);

		const userAgent = req.headers['user-agent'] || 'Unknown Device';
		const ip = req.ip ?? '';
		const deviceId = uuidv4();

		const accessToken = authServices.createJWT(user!._id.toString(), '10s');
		const refreshToken = authServices.createJWT(user!._id.toString(), '20s', deviceId);

		const session: DeviceSessionDbModel = {
			ip,
			deviceId,
			userId: user!._id.toString(),
			title: userAgent,
			lastActiveDate: new Date().toISOString(),
			expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
		};

		await devicesRepositories.addNewDeviceSession(session);

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			secure: true,
		});

		res.status(200).json({ accessToken });

		return;
	} catch (error) {
		res.sendStatus(500);

		return;
	}
};

const refreshToken = async (req: Request, res: Response): Promise<void> => {
	const previousRefreshToken = req.cookies.refreshToken;

	try {
		const previousRefreshTokenPayload = await authServices.getTokenPayload(previousRefreshToken);
		const deviceId = previousRefreshTokenPayload?.deviceId;
		const userId = req.userId ?? '';

		if (!deviceId) {
			res.sendStatus(401);

			return;
		}

		const newActiveDate = new Date().toISOString();

		const newAccessToken = authServices.createJWT(userId, '10s');
		const newRefreshToken = authServices.createJWT(userId, '20s', deviceId);

		await devicesRepositories.updateLastActiveDateByDeviceId(newActiveDate, deviceId);

		await authServices.invalidatePreviousRefreshToken(userId, previousRefreshToken);

		res.cookie('refreshToken', newRefreshToken, {
			httpOnly: true,
			secure: true,
		});

		res.status(200).json({ accessToken: newAccessToken });

		return;
	} catch (error) {
		res.sendStatus(500);

		return;
	}
};

const logout = async (req: Request, res: Response): Promise<void> => {
	const previousRefreshToken = req.cookies.refreshToken;

	try {
		const previousRefreshTokenPayload = await authServices.getTokenPayload(previousRefreshToken);
		const deviceId = previousRefreshTokenPayload?.deviceId;
		const userId = req.userId ?? '';

		if (deviceId) {
			await devicesRepositories.deleteDeviceSession(deviceId);
		}

		await authServices.invalidatePreviousRefreshToken(userId, previousRefreshToken);

		res.sendStatus(204);

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
	logout,
	refreshToken,
	me,
	register,
	resendConfirmationEmail,
	confirmRegistration,
};
