import { Db, MongoClient } from 'mongodb';
import { SETTINGS } from '../settings';

const client: MongoClient = new MongoClient(SETTINGS.MONGO_URL);
export const db: Db = client.db(SETTINGS.DB_NAME);

// export const blogCollection: Collection<BlogDBType> = db.collection<BlogDBType>(SETTINGS.BLOG_COLLECTION_NAME)
// export const postCollection: Collection<PostDBType> = db.collection<PostDBType>(SETTINGS.POST_COLLECTION_NAME)

export const connectDB = async (): Promise<Db> => {
	try {
		await client.connect();
		console.log('Connected to MongoDB');
		return db;
	} catch (err) {
		console.error('Error connecting to MongoDB:', err);
		throw err;
	}
};
