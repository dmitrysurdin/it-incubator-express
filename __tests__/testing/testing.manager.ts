import { SETTINGS } from '../../src/settings';
import request from 'supertest';
import { app } from '../../src/app';

export const testingManager = {
	clear: async (expectedStatusCode: number) => {
		return await request(app)
			.delete(`${SETTINGS.PATH.TESTING}/all-data`)
			.expect(expectedStatusCode);
	},
};
