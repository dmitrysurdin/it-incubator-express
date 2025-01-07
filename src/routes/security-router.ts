import { Router } from 'express';
import { refreshTokenAuthMiddleware } from '../middlewares/authMiddleware';
import { devicesControllers } from '../entities/security/devices/devices.controller';
import { paramsCheckErrorsMiddleware } from '../middlewares/paramsCheckErrorsMiddleware';
import { deviceIdParamValidator } from '../entities/security/devices/validators';

export const securityRouter = Router();

securityRouter.get('/devices', refreshTokenAuthMiddleware, devicesControllers.getAllActiveDevices);
securityRouter.delete(
	'/devices',
	refreshTokenAuthMiddleware,
	devicesControllers.deleteAllActiveDevicesExceptCurrent,
);
securityRouter.delete(
	'/devices/:deviceId',
	refreshTokenAuthMiddleware,
	deviceIdParamValidator,
	paramsCheckErrorsMiddleware,
	devicesControllers.deleteDeviceSession,
);
