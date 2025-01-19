import { UserDbModel } from './user.types';
import { SortOrder } from 'mongoose';
import { UserModelClass } from '../../db/models';
import { ObjectId, WithId } from 'mongodb';

const create = async (user: UserDbModel): Promise<string> => {
	const result = await UserModelClass.create(user);
	return result._id.toString();
};

const getAll = async ({
	limit,
	skip,
	sortDirection,
	sortBy,
	searchLoginTerm,
	searchEmailTerm,
}: {
	limit: number;
	skip: number;
	sortDirection: SortOrder;
	sortBy: string;
	searchLoginTerm: string | null;
	searchEmailTerm: string | null;
}): Promise<{
	totalCount: number;
	items: Array<WithId<UserDbModel>>;
}> => {
	const filter: Record<string, any> = {};

	if (searchLoginTerm || searchEmailTerm) {
		filter.$or = [];

		if (searchLoginTerm) {
			filter.$or.push({ login: { $regex: searchLoginTerm, $options: 'i' } });
		}
		if (searchEmailTerm) {
			filter.$or.push({ email: { $regex: searchEmailTerm, $options: 'i' } });
		}
	}

	const items = await UserModelClass.find(filter)
		.sort({ [sortBy]: sortDirection })
		.skip(skip)
		.limit(limit)
		.lean();

	const totalCount = await UserModelClass.countDocuments(filter);

	return { items, totalCount };
};

const remove = async (id: string): Promise<boolean> => {
	const result = await UserModelClass.deleteOne({ _id: new ObjectId(id) });

	return result.deletedCount > 0;
};

const findByLogin = async (login: string): Promise<UserDbModel | null> => {
	return UserModelClass.findOne({ login }).lean();
};

const findByEmail = async (email: string): Promise<UserDbModel | null> => {
	return UserModelClass.findOne({ email }).lean();
};

export const userRepositories = {
	create,
	getAll,
	remove,
	findByLogin,
	findByEmail,
};
