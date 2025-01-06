import { Router } from 'express';
import { bearerAuthMiddleware } from '../middlewares/authMiddleware';
import { devicesControllers } from '../entities/security/devices/devices.controller';
import { paramsCheckErrorsMiddleware } from '../middlewares/paramsCheckErrorsMiddleware';
import { deviceIdParamValidator } from '../entities/security/devices/validators';

export const securityRouter = Router();

securityRouter.get('/devices', bearerAuthMiddleware, devicesControllers.getAllActiveDevices);
securityRouter.delete(
	'/devices',
	bearerAuthMiddleware,
	devicesControllers.deleteAllActiveDevicesExceptCurrent,
);
securityRouter.delete(
	'/devices/:deviceId',
	bearerAuthMiddleware,
	deviceIdParamValidator,
	paramsCheckErrorsMiddleware,
	devicesControllers.deleteDeviceSession,
);
