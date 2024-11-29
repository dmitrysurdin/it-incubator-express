import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';
import { app } from '../src/app';

let mongoServer: MongoMemoryServer;
let client: MongoClient;

export const setupTestDatabase = (): void => {
	beforeAll(async () => {
		mongoServer = await MongoMemoryServer.create();
		const uri = mongoServer.getUri();

		client = new MongoClient(uri);
		await client.connect();

		app.locals.db = client.db();
	});

	afterAll(async () => {
		await client.close();
		await mongoServer.stop();
	});
};
