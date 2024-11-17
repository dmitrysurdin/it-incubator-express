import { dbData } from '../db/db';

const clearDb = (): void => {
	dbData.blogs = [];
	dbData.posts = [];
};

export const testingRepositories = {
	clearDb,
};
