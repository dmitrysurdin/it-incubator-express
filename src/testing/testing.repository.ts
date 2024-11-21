import { blogCollection, postCollection } from '../db/mongo-db';

const clearDb = async (): Promise<void> => {
	await postCollection.deleteMany({});
	await blogCollection.deleteMany({});
};

export const testingRepositories = {
	clearDb,
};
