import bcrypt from 'bcrypt';
import { authRepositories } from './auth.repository';
import { AuthLoginInputModel } from './auth.types';

const login = async (userBody: AuthLoginInputModel): Promise<boolean> => {
	const { loginOrEmail, password } = userBody;

	const user = await authRepositories.findByLoginOrEmail(loginOrEmail);

	if (!user) {
		return false;
	}

	return await bcrypt.compare(password, user.passwordHash);
};

export const authServices = {
	login,
};
