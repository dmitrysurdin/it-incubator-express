import { app } from './app';
import { SETTINGS } from './settings';
import { connectDB } from './db/mongo-db';

app.listen(SETTINGS.PORT, async () => {
	await connectDB();
	console.log('...server started in port ' + SETTINGS.PORT);
});
