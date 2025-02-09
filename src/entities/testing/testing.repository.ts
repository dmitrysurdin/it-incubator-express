import {
	ApiLogsModelClass,
	BlogModelClass,
	CommentModelClass,
	DeviceSessionModelClass,
	PasswordRecoveryModel,
	PostModelClass,
	RegistrationUserModelClass,
	RevokedRefreshTokenModelClass,
	UserModelClass,
} from '../../db/models';

const clearDb = async (): Promise<void> => {
	await BlogModelClass.deleteMany({});
	await PostModelClass.deleteMany({});
	await CommentModelClass.deleteMany({});
	await UserModelClass.deleteMany({});
	await RegistrationUserModelClass.deleteMany({});
	await RevokedRefreshTokenModelClass.deleteMany({});
	await DeviceSessionModelClass.deleteMany({});
	await ApiLogsModelClass.deleteMany({});
	await PasswordRecoveryModel.deleteMany({});
};

export const testingRepositories = {
	clearDb,
};
