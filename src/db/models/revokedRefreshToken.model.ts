import { Schema, model } from 'mongoose';
import { SETTINGS } from '../../settings';
import { RevokedRefreshTokenDbModel } from '../../entities/auth/auth.types';

const revokedRefreshTokenSchema = new Schema<RevokedRefreshTokenDbModel>({
	userId: { type: String, ref: 'User', required: true },
	token: { type: String, required: true },
});

export const RevokedRefreshTokenModelClass = model<RevokedRefreshTokenDbModel>(
	'RevokedRefreshToken',
	revokedRefreshTokenSchema,
	SETTINGS.REVOKED_REFRESH_TOKEN_COLLECTION_NAME,
);
