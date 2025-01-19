import { ApiLogsDbModel } from './apiLogs.types';
import { ApiLogsModelClass } from '../../db/models';

const addApiLog = async (logEntry: ApiLogsDbModel): Promise<string> => {
	const result = await ApiLogsModelClass.create(logEntry);

	return result._id.toString();
};

const getApiLogsWithinTheDate = async (
	ip: string,
	url: string,
	limitingDate: Date,
): Promise<number> => {
	return ApiLogsModelClass.countDocuments({
		ip,
		url,
		date: { $gte: limitingDate },
	});
};

export const apiLogsRepositories = {
	addApiLog,
	getApiLogsWithinTheDate,
};
