import { DeviceSessionDbModel } from './devices.types';
import { WithId } from 'mongodb';
import { DeviceSessionModelClass } from '../../../db/models';

const getAllActiveDevices = async (
	userId: string,
): Promise<Array<WithId<DeviceSessionDbModel>>> => {
	return DeviceSessionModelClass.find({ userId }).lean();
};

const addNewDeviceSession = async (session: DeviceSessionDbModel): Promise<string> => {
	const result = await DeviceSessionModelClass.create(session);

	return result._id.toString();
};

const deleteAllActiveDevicesExceptCurrent = async (deviceId: string): Promise<boolean> => {
	const result = await DeviceSessionModelClass.deleteMany({
		deviceId: { $ne: deviceId },
	});

	return result.deletedCount > 0;
};

const deleteDeviceSession = async (deviceId: string): Promise<boolean> => {
	const result = await DeviceSessionModelClass.deleteOne({ deviceId });

	return result.deletedCount > 0;
};

const findDeviceSessionByDeviceId = async (
	deviceId: string,
): Promise<DeviceSessionDbModel | null> => {
	return DeviceSessionModelClass.findOne({ deviceId }).lean();
};

const updateLastActiveDateByDeviceId = async (
	newActiveDate: string,
	deviceId: string,
): Promise<boolean> => {
	const result = await DeviceSessionModelClass.updateOne(
		{ deviceId },
		{ $set: { lastActiveDate: newActiveDate } },
	);

	return result.matchedCount > 0;
};

export const devicesRepositories = {
	getAllActiveDevices,
	addNewDeviceSession,
	deleteDeviceSession,
	updateLastActiveDateByDeviceId,
	deleteAllActiveDevicesExceptCurrent,
	findDeviceSessionByDeviceId,
};
