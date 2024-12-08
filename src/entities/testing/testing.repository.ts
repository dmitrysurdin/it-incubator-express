import { blogCollection, postCollection, userCollection } from '../../db/mongo-db';

const clearDb = async (): Promise<void> => {
	await postCollection.deleteMany({});
	await blogCollection.deleteMany({});
	await userCollection.deleteMany({});
};

export const testingRepositories = {
	clearDb,
};
