export interface AuthLoginInputModel {
	loginOrEmail: string;
	password: string;
}

export interface AuthUserDbModel {
	login: string;
	email: string;
	passwordHash: string;
	passwordSalt: string;
	createdAt: string;
}
