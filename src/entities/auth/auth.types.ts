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
	deviceId?: string;
}

export interface RegistrationUserInputModel {
	login: string;
	email: string;
	password: string;
}

export interface RegistrationUserDbModel {
	accountData: {
		login: string;
		email: string;
		passwordHash: string;
		passwordSalt: string;
		createdAt: string;
	};
	emailConfirmation: {
		confirmationCode: string;
		expirationDate: Date;
		isConfirmed: boolean;
	};
}

export interface RevokedRefreshTokenDbModel {
	userId: string;
	token: string;
}

export interface PasswordRecovery extends Document {
	userId: string;
	recoveryCode: string;
	expirationDate: Date;
}
