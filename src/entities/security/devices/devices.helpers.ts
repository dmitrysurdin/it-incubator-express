import { WithId } from 'mongodb';
import { DeviceSessionClientModel, DeviceSessionDbModel } from './devices.types';

export const mapDeviceSessionFromDb = (
	deviceSessionsDb: WithId<DeviceSessionDbModel>,
): DeviceSessionClientModel => {
	return {
		deviceId: deviceSessionsDb.deviceId,
		title: deviceSessionsDb.title,
		lastActiveDate: deviceSessionsDb.lastActiveDate,
		ip: deviceSessionsDb.ip,
	};
};

export const mapDeviceSessionsFromDb = (
	deviceSessionsDb: Array<WithId<DeviceSessionDbModel>>,
): Array<DeviceSessionClientModel> => {
	return deviceSessionsDb.map(mapDeviceSessionFromDb);
};
