import {
	apiLogsCollection,
	blogCollection,
	commentsCollection,
	postCollection,
	registrationUserCollection,
	revokedRefreshTokensCollection,
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
	await revokedRefreshTokensCollection.deleteMany({});
};

export const testingRepositories = {
	clearDb,
};
