import bcrypt from 'bcrypt';
import { authRepositories } from './auth.repository';
import {
	AuthLoginInputModel,
	AuthUserClientModel,
	CustomJwtPayload,
	RegistrationUserDBModel,
	RegistrationUserInputModel,
} from './auth.types';
import jwt from 'jsonwebtoken';
import { mapAuthUserFromDb } from './auth.helpers';
import { userRepositories } from '../users/user.repository';
import { v4 as uuidv4 } from 'uuid';
import { add } from 'date-fns';
import { emailService } from '../../services/email/email-service';

const login = async (userBody: AuthLoginInputModel): Promise<boolean> => {
	const { loginOrEmail, password } = userBody;

	const user = await authRepositories.findUserByLoginOrEmail(loginOrEmail);

	if (!user) {
		return false;
	}

	return await bcrypt.compare(password, user.passwordHash);
};

const getUserById = async (userId: string | null): Promise<boolean | AuthUserClientModel> => {
	if (!userId) {
		return false;
	}

	const user = await authRepositories.findUserById(userId);

	if (!user) {
		return false;
	}

	return mapAuthUserFromDb(user);
};

const createJWT = (userId: string) => {
	const secret = process.env.JWT_SECRET;
	if (!secret) {
		throw new Error('JWT_SECRET is not available');
	}

	return jwt.sign({ userId }, secret, { expiresIn: '10m' });
};

const getUserIdByToken = (token: string): string => {
	const secret = process.env.JWT_SECRET;
	if (!secret) {
		throw new Error('JWT_SECRET is not available');
	}

	try {
		const decoded = jwt.verify(token, secret) as CustomJwtPayload;

		return decoded.userId;
	} catch (error) {
		throw new Error('Token is wrong or expired');
	}
};

const register = async (userBody: RegistrationUserInputModel): Promise<boolean> => {
	const { login, email, password } = userBody;

	const existingRegistrationUserByEmail = await authRepositories.findRegistrationUserByEmail(email);

	if (existingRegistrationUserByEmail) {
		throw {
			errorsMessages: [{ field: 'email', message: 'user with this email is already registered' }],
		};
	}

	const existingRegistrationUserByLogin = await authRepositories.findRegistrationUserByLogin(login);

	if (existingRegistrationUserByLogin) {
		throw {
			errorsMessages: [{ field: 'login', message: 'user with this login is already registered' }],
		};
	}

	const existingUserByLogin = await userRepositories.findByLogin(login);

	if (existingUserByLogin) {
		throw {
			errorsMessages: [{ field: 'login', message: 'user with this login is already existed' }],
		};
	}

	const existingUserByEmail = await userRepositories.findByEmail(email);

	if (existingUserByEmail) {
		throw {
			errorsMessages: [{ field: 'email', message: 'user with this email is already existed' }],
		};
	}

	const passwordSalt = await bcrypt.genSalt(10);
	const passwordHash = await bcrypt.hash(password, passwordSalt);

	const newUser: RegistrationUserDBModel = {
		accountData: {
			login,
			email,
			passwordHash,
			passwordSalt,
			createdAt: new Date().toISOString(),
		},
		emailConfirmation: {
			confirmationCode: uuidv4(),
			expirationDate: add(new Date(), {
				hours: 1,
			}),
			isConfirmed: false,
		},
	};

	try {
		await authRepositories.createUser(newUser);
		await emailService.sendConfirmationEmail({
			email: newUser.accountData.email,
			confirmationCode: newUser.emailConfirmation.confirmationCode,
		});
	} catch (e) {
		await authRepositories.removeRegistrationUserByEmail(newUser.accountData.email);

		return false;
	}

	return true;
};

const confirmRegistration = async (code: string): Promise<boolean> => {
	const user = await authRepositories.findRegistrationUserByCode(code);

	if (!user) {
		throw {
			errorsMessages: [{ field: 'code', message: 'code is invalid' }],
		};
	}

	if (user.emailConfirmation.isConfirmed) {
		throw {
			errorsMessages: [{ field: 'code', message: 'code is already applied' }],
		};
	}

	if (user.emailConfirmation.expirationDate < new Date()) {
		throw {
			errorsMessages: [{ field: 'code', message: 'code is expired' }],
		};
	}

	const isUpdated = await authRepositories.confirmRegistrationById(user._id.toString());

	if (!isUpdated) {
		return false;
	}

	const isCreated = await userRepositories.create({
		...user.accountData,
		createdAt: new Date().toISOString(),
	});

	return !!isCreated;
};

const resendConfirmationEmail = async (email: string): Promise<void> => {
	await emailService.resendConfirmationEmail(email);
};

export const authServices = {
	login,
	createJWT,
	getUserIdByToken,
	getUserById,
	register,
	resendConfirmationEmail,
	confirmRegistration,
};
