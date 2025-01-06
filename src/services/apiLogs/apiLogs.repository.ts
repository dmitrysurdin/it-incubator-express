import { apiLogsCollection } from '../../db/mongo-db';
import { ApiLogsDbModel } from './apiLogs.types';

const addApiLog = async (logEntry: ApiLogsDbModel): Promise<string> => {
	const result = await apiLogsCollection.insertOne(logEntry);

	return result.insertedId.toString();
};

const getApiLogsWithinTheDate = async (
	ip: string,
	url: string,
	limitingDate: Date,
): Promise<number> => {
	return await apiLogsCollection.countDocuments({
		ip,
		url,
		date: { $gte: limitingDate },
	});
};

export const apiLogsRepositories = {
	addApiLog,
	getApiLogsWithinTheDate,
};
