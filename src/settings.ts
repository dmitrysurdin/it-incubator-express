import { config } from 'dotenv';

config();

export const SETTINGS = {
	PORT: process.env.PORT || 3003,
	LOGIN: process.env.LOGIN,
	PASSWORD: process.env.PASSWORD,
	MONGO_URL: process.env.MONGO_URL || 'mongodb://0.0.0.0:27017',
	DB_NAME: process.env.DB_NAME,
	BLOG_COLLECTION_NAME: 'blogs',
	POST_COLLECTION_NAME: 'posts',
	PATH: {
		BLOGS: '/blogs',
		POSTS: '/posts',
		TESTING: '/testing',
	},
};
