import { registrationUserCollection, userCollection } from '../../db/mongo-db';
import { AuthUserDbModel, RegistrationUserDBModel } from './auth.types';
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
): Promise<WithId<RegistrationUserDBModel> | null> => {
	return registrationUserCollection.findOne({ 'accountData.email': email });
};

const findRegistrationUserByLogin = async (
	login: string,
): Promise<WithId<RegistrationUserDBModel> | null> => {
	return registrationUserCollection.findOne({ 'accountData.login': login });
};

const findRegistrationUserByCode = async (
	code: string,
): Promise<WithId<RegistrationUserDBModel> | null> => {
	return registrationUserCollection.findOne({ 'emailConfirmation.confirmationCode': code });
};

const createUser = async (user: RegistrationUserDBModel): Promise<string> => {
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

export const authRepositories = {
	findUserByLoginOrEmail,
	findUserById,
	createUser,
	removeRegistrationUserByEmail,
	findRegistrationUserByEmail,
	findRegistrationUserByLogin,
	findRegistrationUserByCode,
	confirmRegistrationById,
};
