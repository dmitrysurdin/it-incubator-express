import { UserClientModel, UserDbModel, UserInputModel } from './user.types';
import { userRepositories } from './user.repository';
import bcrypt from 'bcrypt';
import { SortDirection } from 'mongodb';
import { mapUsersFromDb } from './user.helpers';

const create = async (user: UserInputModel): Promise<UserClientModel> => {
	const existingUserByLogin = await userRepositories.findByLogin(user.login);

	if (existingUserByLogin) {
		throw { errorsMessages: [{ field: 'login', message: 'login should be unique' }] };
	}

	const existingUserByEmail = await userRepositories.findByEmail(user.email);

	if (existingUserByEmail) {
		throw { errorsMessages: [{ field: 'email', message: 'email should be unique' }] };
	}

	const passwordSalt = await bcrypt.genSalt(10);
	const passwordHash = await bcrypt.hash(user.password, passwordSalt);

	const newUser: UserDbModel = {
		passwordHash,
		passwordSalt,
		login: user.login,
		email: user.email,
		createdAt: new Date().toISOString(),
	};

	const createdId = await userRepositories.create(newUser);

	return {
		email: newUser.email,
		login: newUser.login,
		createdAt: newUser.createdAt,
		id: createdId,
	};
};

const getAll = async ({
	pageSize,
	pageNumber,
	sortDirection,
	sortBy,
	searchLoginTerm,
	searchEmailTerm,
}: {
	pageSize?: string;
	pageNumber?: string;
	sortDirection?: string;
	sortBy?: string;
	searchLoginTerm?: string;
	searchEmailTerm?: string;
}): Promise<{
	items: Array<UserClientModel>;
	totalCount: number;
	pagesCount: number;
	page: number;
	pageSize: number;
}> => {
	const limit = Number(pageSize) || 10;
	const validatedPageNumber = Number(pageNumber) || 1;

	const params = {
		limit,
		validatedPageNumber,
		skip: (validatedPageNumber - 1) * limit,
		sortDirection: (sortDirection as SortDirection) ?? 'desc',
		sortBy: sortBy ?? 'createdAt',
		searchLoginTerm: searchLoginTerm ?? null,
		searchEmailTerm: searchEmailTerm ?? null,
	};

	const { items, totalCount } = await userRepositories.getAll({
		...params,
	});
	const pagesCount = Math.ceil(totalCount / limit);

	return {
		pagesCount,
		totalCount,
		pageSize: limit,
		page: validatedPageNumber,
		items: mapUsersFromDb(items),
	};
};

const remove = async (id: string): Promise<boolean> => {
	return await userRepositories.remove(id);
};

export const userServices = {
	create,
	getAll,
	remove,
};
