import { Schema, model } from 'mongoose';
import { SETTINGS } from '../../settings';
import { DeviceSessionDbModel } from '../../entities/security/devices/devices.types';

const deviceSessionSchema = new Schema<DeviceSessionDbModel>({
	ip: { type: String, required: true },
	title: { type: String, required: true },
	deviceId: { type: String, required: true, unique: true },
	userId: { type: String, ref: 'User', required: true },
	lastActiveDate: { type: String, required: true },
	expiresAt: { type: String, required: true },
});

export const DeviceSessionModelClass = model<DeviceSessionDbModel>(
	'DeviceSessionDbModel',
	deviceSessionSchema,
	SETTINGS.DEVICE_SESSIONS_COLLECTION_NAME,
);
