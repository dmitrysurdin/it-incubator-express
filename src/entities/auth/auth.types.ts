import { JwtPayload } from 'jsonwebtoken';

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

export interface AuthUserClientModel {
	login: string;
	email: string;
	userId: string;
}

export interface CustomJwtPayload extends JwtPayload {
	userId: string;
}
