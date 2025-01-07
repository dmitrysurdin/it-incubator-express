import { Request, Response } from 'express';
import { devicesRepositories } from './devices.repository';
import { mapDeviceSessionsFromDb } from './devices.helpers';
import { devicesServices } from './devices.service';
import { authServices } from '../../auth/auth.service';

const getAllActiveDevices = async (req: Request, res: Response): Promise<void> => {
	const userId = req.userId ?? '';

	const activeDevicesFromDb = await devicesRepositories.getAllActiveDevices(userId);
	const activeDevicesForClient = mapDeviceSessionsFromDb(activeDevicesFromDb);

	res.status(200).json(activeDevicesForClient);
};

const deleteAllActiveDevicesExceptCurrent = async (req: Request, res: Response): Promise<void> => {
	const refreshToken = req.cookies.refreshToken;

	try {
		const refreshTokenPayload = await authServices.getTokenPayload(refreshToken);

		const currentDeviceId = refreshTokenPayload?.deviceId;

		if (!currentDeviceId) {
			res.sendStatus(404);

			return;
		}

		const isDeleted = await devicesServices.deleteAllActiveDevicesExceptCurrent(currentDeviceId);

		if (!isDeleted) {
			res.sendStatus(500);

			return;
		}

		res.sendStatus(204);
	} catch (e) {
		res.sendStatus(500);

		return;
	}
};

const deleteDeviceSession = async (req: Request, res: Response): Promise<void> => {
	const deviceId = req.params.deviceId;
	const userId = req.userId;
	const refreshToken = req.cookies.refreshToken;
	const session = await devicesRepositories.findDeviceSessionByDeviceId(deviceId);

	if (session?.deviceId !== deviceId) {
		res.sendStatus(404);

		return;
	}

	if (session?.userId !== userId) {
		res.sendStatus(403);

		return;
	}

	try {
		const isDeleted = await devicesRepositories.deleteDeviceSession(deviceId);

		if (!isDeleted) {
			res.sendStatus(404);

			return;
		}
		if (session?.deviceId === deviceId) {
			await authServices.invalidatePreviousRefreshToken(userId, refreshToken);
		}

		res.sendStatus(204);
	} catch (e) {
		res.sendStatus(500);

		return;
	}
};

export const devicesControllers = {
	getAllActiveDevices,
	deleteAllActiveDevicesExceptCurrent,
	deleteDeviceSession,
};
