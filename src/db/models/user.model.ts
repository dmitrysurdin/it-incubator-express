import { Schema, model } from 'mongoose';
import { SETTINGS } from '../../settings';
import { UserDbModel } from '../../entities/users/user.types';

const userSchema = new Schema<UserDbModel>({
	login: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	passwordHash: { type: String, required: true },
	passwordSalt: { type: String, required: true },
	createdAt: { type: String, required: true },
});

export const UserModelClass = model<UserDbModel>('User', userSchema, SETTINGS.USER_COLLECTION_NAME);
