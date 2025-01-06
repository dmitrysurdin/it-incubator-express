import { Router } from 'express';
import { bearerAuthMiddleware } from '../middlewares/authMiddleware';
import { devicesControllers } from '../entities/security/devices/devices.controller';

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
	devicesControllers.deleteDeviceSession,
);
