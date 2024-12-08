import { userCollection } from '../../db/mongo-db';
import { UserDbModel } from './user.types';
import { ObjectId, SortDirection, WithId } from 'mongodb';

const create = async (user: UserDbModel): Promise<string> => {
	const result = await userCollection.insertOne({ ...user });

	return result.insertedId.toString();
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
	sortDirection: SortDirection;
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
	const items = await userCollection
		.find(filter)
		.sort(sortBy, sortDirection)
		.skip(skip)
		.limit(limit)
		.toArray();
	const totalCount = await userCollection.countDocuments(filter);

	return { items, totalCount };
};

const remove = async (id: string): Promise<boolean> => {
	const result = await userCollection.deleteOne({ _id: new ObjectId(id) });

	return !!result.deletedCount;
};

const findByLogin = async (login: string): Promise<UserDbModel | null> => {
	return await userCollection.findOne({ login });
};

const findByEmail = async (email: string): Promise<UserDbModel | null> => {
	return await userCollection.findOne({ email });
};

export const userRepositories = {
	create,
	getAll,
	remove,
	findByLogin,
	findByEmail,
};
