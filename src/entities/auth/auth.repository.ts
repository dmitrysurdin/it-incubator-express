import { userCollection } from '../../db/mongo-db';
import { AuthUserDbModel } from './auth.types';
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

export const authRepositories = {
	findUserByLoginOrEmail,
	findUserById,
};
