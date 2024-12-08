export interface UserInputModel {
	login: string;
	email: string;
	password: string;
}

export interface UserDbModel {
	login: string;
	email: string;
	passwordHash: string;
	passwordSalt: string;
	createdAt: string;
}

export type UserClientModel = {
	id: string;
	login: string;
	email: string;
	createdAt: string;
};
