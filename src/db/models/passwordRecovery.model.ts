import mongoose, { Schema } from 'mongoose';
import { SETTINGS } from '../../settings';
import { PasswordRecovery } from '../../entities/auth/auth.types';

const PasswordRecoverySchema = new Schema<PasswordRecovery>({
	userId: { type: String, required: false },
	recoveryCode: { type: String, required: true, unique: true },
	expirationDate: { type: Date, required: true },
});

export const PasswordRecoveryModel = mongoose.model<PasswordRecovery>(
	'PasswordRecovery',
	PasswordRecoverySchema,
	SETTINGS.PASSWORD_RECOVERY_COLLECTION_NAME,
);
