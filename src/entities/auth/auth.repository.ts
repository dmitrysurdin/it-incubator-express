import {
	registrationUserCollection,
	revokedRefreshTokensCollection,
	userCollection,
} from '../../db/mongo-db';
import { AuthUserDbModel, RegistrationUserDbModel } from './auth.types';
import { ObjectId, WithId } from 'mongodb';

const findUserByLoginOrEmail = async (
	loginOrEmail: string,
): Promise<WithId<AuthUserDbModel> | null> => {
	return userCollection.findOne({
		$or: [{ login: loginOrEmail }, { email: loginOrEmail }],
	});
};

const findUserById = async (id: string): Promise<WithId<AuthUserDbModel> | null> => {
	return userCollection.findOne({ _id: new ObjectId(id) });
};

const findRegistrationUserByEmail = async (
	email: string,
): Promise<WithId<RegistrationUserDbModel> | null> => {
	return registrationUserCollection.findOne({ 'accountData.email': email });
};

const findRegistrationUserByLogin = async (
	login: string,
): Promise<WithId<RegistrationUserDbModel> | null> => {
	return registrationUserCollection.findOne({ 'accountData.login': login });
};

const findRegistrationUserByCode = async (
	code: string,
): Promise<WithId<RegistrationUserDbModel> | null> => {
	return registrationUserCollection.findOne({ 'emailConfirmation.confirmationCode': code });
};

const createUser = async (user: RegistrationUserDbModel): Promise<string> => {
	const result = await registrationUserCollection.insertOne({ ...user });

	return result.insertedId.toString();
};

const removeRegistrationUserByEmail = async (email: string): Promise<boolean> => {
	const result = await registrationUserCollection.deleteOne({
		'accountData.email': email,
	});

	return !!result.deletedCount;
};

const confirmRegistrationById = async (id: string): Promise<boolean> => {
	const result = await registrationUserCollection.updateOne(
		{ _id: new ObjectId(id) },
		{ $set: { 'emailConfirmation.isConfirmed': true } },
	);
	return !!result.matchedCount;
};

const updateConfirmationCodeById = async (id: string, code: string): Promise<boolean> => {
	const result = await registrationUserCollection.updateOne(
		{ _id: new ObjectId(id) },
		{ $set: { 'emailConfirmation.confirmationCode': code } },
	);
	return !!result.matchedCount;
};

const isTokenRevoked = async (token: string): Promise<boolean> => {
	const revokedToken = await revokedRefreshTokensCollection.findOne({ token });
	return !!revokedToken;
};

const revokeRefreshToken = async (userId: string, token: string): Promise<void> => {
	await revokedRefreshTokensCollection.insertOne({ userId, token });
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
