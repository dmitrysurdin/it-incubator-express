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

export const mapUsersFromDb = (blogsDb: Array<WithId<UserDbModel>>): Array<UserClientModel> => {
	return blogsDb.map(mapUserFromDb);
};
