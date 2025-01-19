import { Schema, model } from 'mongoose';
import { SETTINGS } from '../../settings';
import { ApiLogsDbModel } from '../../services/apiLogs/apiLogs.types';

const apiLogsSchema = new Schema<ApiLogsDbModel>({
	ip: { type: String, required: true },
	url: { type: String, required: true },
	date: { type: Date, required: true },
});

export const ApiLogsModelClass = model<ApiLogsDbModel>(
	'ApiLog',
	apiLogsSchema,
	SETTINGS.API_LOGS_COLLECTION_NAME,
);
