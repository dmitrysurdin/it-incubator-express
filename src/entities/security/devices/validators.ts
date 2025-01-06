import { param } from 'express-validator';
import { devicesRepositories } from './devices.repository';

const deviceIdValidator = param('deviceId')
	.isString()
	.withMessage('Invalid blogId')
	.custom(async (id: string) => {
		const session = await devicesRepositories.findDeviceSessionByDeviceId(id);

		if (session?.deviceId !== id) {
			throw new Error('session with this id does not exist');
		}
	});

export const deviceIdParamValidator = [deviceIdValidator];
