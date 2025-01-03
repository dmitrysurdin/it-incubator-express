import { Collection, Db, MongoClient } from 'mongodb';
import { SETTINGS } from '../settings';
import { BlogModel } from '../entities/blogs/blog.types';
import { PostModel } from '../entities/posts/post.types';
import { UserDbModel } from '../entities/users/user.types';
import { CommentDBModel } from '../entities/comments/comment.types';
import { RegistrationUserDBModel, RevokedRefreshTokenDBModel } from '../entities/auth/auth.types';

const client: MongoClient = new MongoClient(SETTINGS.MONGO_URL);
export const db: Db = client.db(SETTINGS.DB_NAME);

export const blogCollection: Collection<BlogModel> = db.collection<BlogModel>(
	SETTINGS.BLOG_COLLECTION_NAME,
);
export const postCollection: Collection<PostModel> = db.collection<PostModel>(
	SETTINGS.POST_COLLECTION_NAME,
);
export const commentsCollection: Collection<CommentDBModel> = db.collection<CommentDBModel>(
	SETTINGS.COMMENTS_COLLECTION_NAME,
);
export const userCollection: Collection<UserDbModel> = db.collection<UserDbModel>(
	SETTINGS.USER_COLLECTION_NAME,
);
export const registrationUserCollection: Collection<RegistrationUserDBModel> =
	db.collection<RegistrationUserDBModel>(SETTINGS.REGISTRATION_USER_COLLECTION_NAME);
export const revokedRefreshTokensCollection: Collection<RevokedRefreshTokenDBModel> =
	db.collection<RevokedRefreshTokenDBModel>(SETTINGS.REVOKED_REFRESH_TOKEN_COLLECTION_NAME);

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
