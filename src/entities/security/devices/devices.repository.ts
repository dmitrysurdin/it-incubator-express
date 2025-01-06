import { userSessionsCollection } from '../../../db/mongo-db';
import { DeviceSessionDbModel } from './devices.types';
import { WithId } from 'mongodb';

const getAllActiveDevices = async (): Promise<Array<WithId<DeviceSessionDbModel>>> => {
	return userSessionsCollection.find({}).toArray();
};

const addNewDeviceSession = async (session: DeviceSessionDbModel): Promise<string> => {
	const result = await userSessionsCollection.insertOne({ ...session });

	return result.insertedId.toString();
};

const deleteAllActiveDevicesExceptCurrent = async (deviceId: string): Promise<boolean> => {
	const result = await userSessionsCollection.deleteMany({
		deviceId: { $ne: deviceId },
	});

	return !!result.deletedCount;
};

const deleteDeviceSession = async (deviceId: string): Promise<boolean> => {
	const result = await userSessionsCollection.deleteOne({ deviceId });

	return !!result.deletedCount;
};

const findDeviceSessionByDeviceId = async (
	deviceId: string,
): Promise<DeviceSessionDbModel | null> => {
	return await userSessionsCollection.findOne({ deviceId });
};

const updateLastActiveDateByDeviceId = async (
	newActiveDate: string,
	deviceId: string,
): Promise<boolean> => {
	const result = await userSessionsCollection.updateOne(
		{ deviceId },
		{ $set: { lastActiveDate: newActiveDate } },
	);

	return !!result.matchedCount;
};

export const devicesRepositories = {
	getAllActiveDevices,
	addNewDeviceSession,
	deleteDeviceSession,
	updateLastActiveDateByDeviceId,
	deleteAllActiveDevicesExceptCurrent,
	findDeviceSessionByDeviceId,
};
