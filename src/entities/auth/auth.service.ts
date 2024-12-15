import bcrypt from 'bcrypt';
import { authRepositories } from './auth.repository';
import { AuthLoginInputModel, AuthUserClientModel, CustomJwtPayload } from './auth.types';
import jwt from 'jsonwebtoken';
import { mapAuthUserFromDb } from './auth.helpers';

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

export const authServices = {
	login,
	createJWT,
	getUserIdByToken,
	getUserById,
};
