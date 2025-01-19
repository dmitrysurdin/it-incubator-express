import { SETTINGS } from '../settings';
import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
	try {
		await mongoose.connect(SETTINGS.MONGO_URL);
		console.log('Connected to MongoDB');
	} catch (err) {
		await mongoose.disconnect();
		console.error('Error connecting to MongoDB:', err);
		throw err;
	}
};
