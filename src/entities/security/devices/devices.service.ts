import { devicesRepositories } from './devices.repository';

const deleteAllActiveDevicesExceptCurrent = async (deviceId: string): Promise<boolean> => {
	return await devicesRepositories.deleteAllActiveDevicesExceptCurrent(deviceId);
};

export const devicesServices = {
	deleteAllActiveDevicesExceptCurrent,
};
