import { WithId } from 'mongodb';
import { UserClientModel, UserDbModel } from './user.types';

export const mapUserFromDb = (userDb: WithId<UserDbModel>): UserClientModel => {
	return {
		id: userDb._id.toString(),
		login: userDb.login,
		email: userDb.email,
		createdAt: userDb.createdAt,
	};
};

export const mapUsersFromDb = (usersDb: Array<WithId<UserDbModel>>): Array<UserClientModel> => {
	return usersDb.map(mapUserFromDb);
};
