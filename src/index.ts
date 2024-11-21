import { app } from './app';
import { SETTINGS } from './settings';
import { connectDB } from './db/mongo-db';

const bootstrap = async (): Promise<void> => {
	await connectDB();
	app.listen(SETTINGS.PORT, async () => {
		console.log('...server started in port ' + SETTINGS.PORT);
	});
};

bootstrap();
