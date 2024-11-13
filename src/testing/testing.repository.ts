import { dbData } from '../db/db';

const clearDb = (): void => {
	dbData.blogs = [];
};

export const testingRepositories = {
	clearDb,
};
