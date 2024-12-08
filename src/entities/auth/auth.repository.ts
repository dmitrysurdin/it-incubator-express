import { userCollection } from '../../db/mongo-db';
import { AuthUserDbModel } from './auth.types';

const findByLoginOrEmail = async (loginOrEmail: string): Promise<AuthUserDbModel | null> => {
	return await userCollection.findOne({ $or: [{ login: loginOrEmail }, { email: loginOrEmail }] });
};

export const authRepositories = {
	findByLoginOrEmail,
};
