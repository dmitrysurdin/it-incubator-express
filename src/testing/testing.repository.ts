import { dbData } from '../db/local-db';

const clearDb = (): void => {
	dbData.blogs = [];
	dbData.posts = [];
};

export const testingRepositories = {
	clearDb,
};
