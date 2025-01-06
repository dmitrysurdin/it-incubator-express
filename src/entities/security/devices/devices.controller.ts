import { Request, Response } from 'express';
import { devicesRepositories } from './devices.repository';
import { mapDeviceSessionsFromDb } from './devices.helpers';
import { devicesServices } from './devices.service';
import { authServices } from '../../auth/auth.service';

const getAllActiveDevices = async (req: Request, res: Response): Promise<void> => {
	const activeDevices = mapDeviceSessionsFromDb(await devicesRepositories.getAllActiveDevices());

	res.status(200).json(activeDevices);
};

const deleteAllActiveDevicesExceptCurrent = async (req: Request, res: Response): Promise<void> => {
	const previousRefreshToken = req.cookies.refreshToken;

	if (!previousRefreshToken) {
		res.sendStatus(401);

		return;
	}

	const previousRefreshTokenPayload = await authServices.getTokenPayload(previousRefreshToken);
	const currentDeviceId = previousRefreshTokenPayload?.deviceId;

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
};

const deleteDeviceSession = async (req: Request, res: Response): Promise<void> => {
	const deviceId = req.params.deviceId;

	const session = await devicesRepositories.findDeviceSessionByDeviceId(deviceId);

	if (session?.deviceId !== deviceId) {
		res.sendStatus(403);

		return;
	}

	const isDeleted = devicesRepositories.deleteDeviceSession(deviceId);

	if (!isDeleted) {
		res.sendStatus(404);

		return;
	}

	res.sendStatus(204);
};

export const devicesControllers = {
	getAllActiveDevices,
	deleteAllActiveDevicesExceptCurrent,
	deleteDeviceSession,
};
