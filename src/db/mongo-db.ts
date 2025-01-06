import { Collection, Db, MongoClient } from 'mongodb';
import { SETTINGS } from '../settings';
import { BlogModel } from '../entities/blogs/blog.types';
import { PostModel } from '../entities/posts/post.types';
import { UserDbModel } from '../entities/users/user.types';
import { CommentDbModel } from '../entities/comments/comment.types';
import { RegistrationUserDbModel, RevokedRefreshTokenDbModel } from '../entities/auth/auth.types';
import { DeviceSessionDbModel } from '../entities/security/devices/devices.types';
import { ApiLogsDbModel } from '../services/apiLogs/apiLogs.types';

const client: MongoClient = new MongoClient(SETTINGS.MONGO_URL);
export const db: Db = client.db(SETTINGS.DB_NAME);

export const blogCollection: Collection<BlogModel> = db.collection<BlogModel>(
	SETTINGS.BLOG_COLLECTION_NAME,
);
export const postCollection: Collection<PostModel> = db.collection<PostModel>(
	SETTINGS.POST_COLLECTION_NAME,
);
export const commentsCollection: Collection<CommentDbModel> = db.collection<CommentDbModel>(
	SETTINGS.COMMENTS_COLLECTION_NAME,
);
export const userCollection: Collection<UserDbModel> = db.collection<UserDbModel>(
	SETTINGS.USER_COLLECTION_NAME,
);
export const registrationUserCollection: Collection<RegistrationUserDbModel> =
	db.collection<RegistrationUserDbModel>(SETTINGS.REGISTRATION_USER_COLLECTION_NAME);
export const revokedRefreshTokensCollection: Collection<RevokedRefreshTokenDbModel> =
	db.collection<RevokedRefreshTokenDbModel>(SETTINGS.REVOKED_REFRESH_TOKEN_COLLECTION_NAME);
export const userSessionsCollection: Collection<DeviceSessionDbModel> =
	db.collection<DeviceSessionDbModel>(SETTINGS.DEVICE_SESSIONS_COLLECTION_NAME);
export const apiLogsCollection: Collection<ApiLogsDbModel> = db.collection<ApiLogsDbModel>(
	SETTINGS.API_LOGS_COLLECTION_NAME,
);

export const connectDB = async (): Promise<Db> => {
	try {
		await client.connect();
		console.log('Connected to MongoDB');
		return db;
	} catch (err) {
		await client.close();
		console.error('Error connecting to MongoDB:', err);
		throw err;
	}
};
