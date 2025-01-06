import {
	apiLogsCollection,
	blogCollection,
	commentsCollection,
	postCollection,
	registrationUserCollection,
	userCollection,
	userSessionsCollection,
} from '../../db/mongo-db';

const clearDb = async (): Promise<void> => {
	await postCollection.deleteMany({});
	await blogCollection.deleteMany({});
	await userCollection.deleteMany({});
	await commentsCollection.deleteMany({});
	await registrationUserCollection.deleteMany({});
	await userSessionsCollection.deleteMany({});
	await apiLogsCollection.deleteMany({});
};

export const testingRepositories = {
	clearDb,
};
