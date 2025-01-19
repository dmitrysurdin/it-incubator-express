import { AuthUserDbModel, RegistrationUserDbModel } from './auth.types';
import {
	RegistrationUserModelClass,
	RevokedRefreshTokenModelClass,
	UserModelClass,
} from '../../db/models';
import { WithId } from 'mongodb';

const findUserByLoginOrEmail = async (
	loginOrEmail: string,
): Promise<WithId<AuthUserDbModel> | null> => {
	return UserModelClass.findOne({
		$or: [{ login: loginOrEmail }, { email: loginOrEmail }],
	}).lean();
};

const findUserById = async (id: string): Promise<WithId<AuthUserDbModel> | null> => {
	return UserModelClass.findById(id).lean();
};

const findRegistrationUserByEmail = async (
	email: string,
): Promise<WithId<RegistrationUserDbModel> | null> => {
	return RegistrationUserModelClass.findOne({ 'accountData.email': email }).lean();
};

const findRegistrationUserByLogin = async (
	login: string,
): Promise<WithId<RegistrationUserDbModel> | null> => {
	return RegistrationUserModelClass.findOne({ 'accountData.login': login }).lean();
};

const findRegistrationUserByCode = async (
	code: string,
): Promise<WithId<RegistrationUserDbModel> | null> => {
	return RegistrationUserModelClass.findOne({ 'emailConfirmation.confirmationCode': code }).lean();
};

const createUser = async (user: RegistrationUserDbModel): Promise<string> => {
	const result = await RegistrationUserModelClass.create(user);

	return result._id.toString();
};

const removeRegistrationUserByEmail = async (email: string): Promise<boolean> => {
	const result = await RegistrationUserModelClass.deleteOne({
		'accountData.email': email,
	});

	return result.deletedCount > 0;
};

const confirmRegistrationById = async (id: string): Promise<boolean> => {
	const result = await RegistrationUserModelClass.updateOne(
		{ _id: id },
		{ $set: { 'emailConfirmation.isConfirmed': true } },
	);

	return result.matchedCount > 0;
};

const updateConfirmationCodeById = async (id: string, code: string): Promise<boolean> => {
	const result = await RegistrationUserModelClass.updateOne(
		{ _id: id },
		{ $set: { 'emailConfirmation.confirmationCode': code } },
	);

	return result.matchedCount > 0;
};

const isTokenRevoked = async (token: string): Promise<boolean> => {
	const revokedToken = await RevokedRefreshTokenModelClass.findOne({ token }).lean();

	return !!revokedToken;
};

const revokeRefreshToken = async (userId: string, token: string): Promise<void> => {
	await RevokedRefreshTokenModelClass.create({ userId, token });
};

export const authRepositories = {
	findUserByLoginOrEmail,
	findUserById,
	createUser,
	removeRegistrationUserByEmail,
	findRegistrationUserByEmail,
	findRegistrationUserByLogin,
	findRegistrationUserByCode,
	confirmRegistrationById,
	updateConfirmationCodeById,
	isTokenRevoked,
	revokeRefreshToken,
};
