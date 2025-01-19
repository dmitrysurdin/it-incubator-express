import { Schema, model } from 'mongoose';
import { SETTINGS } from '../../settings';
import { RegistrationUserDbModel } from '../../entities/auth/auth.types';

const registrationUserSchema = new Schema<RegistrationUserDbModel>({
	accountData: {
		login: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		passwordHash: { type: String, required: true },
		passwordSalt: { type: String, required: true },
		createdAt: { type: String, required: true },
	},
	emailConfirmation: {
		confirmationCode: { type: String, required: true },
		expirationDate: { type: Date, required: true },
		isConfirmed: { type: Boolean, required: true },
	},
});

export const RegistrationUserModelClass = model<RegistrationUserDbModel>(
	'RegistrationUser',
	registrationUserSchema,
	SETTINGS.REGISTRATION_USER_COLLECTION_NAME,
);
