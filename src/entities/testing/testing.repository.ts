import {
	blogCollection,
	commentsCollection,
	postCollection,
	registrationUserCollection,
	userCollection,
} from '../../db/mongo-db';

const clearDb = async (): Promise<void> => {
	await postCollection.deleteMany({});
	await blogCollection.deleteMany({});
	await userCollection.deleteMany({});
	await commentsCollection.deleteMany({});
	await registrationUserCollection.deleteMany({});
};

export const testingRepositories = {
	clearDb,
};
