import {
	ApiLogsModelClass,
	BlogModelClass,
	CommentModelClass,
	DeviceSessionModelClass,
	PasswordRecoveryModelClass,
	PostModelClass,
	RegistrationUserModelClass,
	RevokedRefreshTokenModelClass,
	UserModelClass,
} from '../../db/models';
import { CommentLikeModelClass } from '../../db/models/commentLikeModelClass';

const clearDb = async (): Promise<void> => {
	await BlogModelClass.deleteMany({});
	await PostModelClass.deleteMany({});
	await CommentModelClass.deleteMany({});
	await CommentLikeModelClass.deleteMany({});
	await UserModelClass.deleteMany({});
	await RegistrationUserModelClass.deleteMany({});
	await RevokedRefreshTokenModelClass.deleteMany({});
	await DeviceSessionModelClass.deleteMany({});
	await ApiLogsModelClass.deleteMany({});
	await PasswordRecoveryModelClass.deleteMany({});
};

export const testingRepositories = {
	clearDb,
};
