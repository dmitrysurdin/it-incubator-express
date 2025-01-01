import { config } from 'dotenv';

config();

export const SETTINGS = {
	PORT: process.env.PORT || 3003,
	LOGIN: process.env.LOGIN,
	PASSWORD: process.env.PASSWORD,
	MONGO_URL: process.env.MONGO_URL || 'mongodb://0.0.0.0:27017',
	EMAIL: process.env.EMAIL,
	EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
	DB_NAME: 'database',
	BLOG_COLLECTION_NAME: 'blogs',
	POST_COLLECTION_NAME: 'posts',
	COMMENTS_COLLECTION_NAME: 'comments',
	USER_COLLECTION_NAME: 'users',
	REGISTRATION_USER_COLLECTION_NAME: 'registrationUsers',
	REVOKED_REFRESH_TOKEN_COLLECTION_NAME: 'revokedRefreshTokensCollection',
	PATH: {
		BLOGS: '/blogs',
		POSTS: '/posts',
		COMMENTS: '/comments',
		USERS: '/users',
		AUTH: '/auth',
		TESTING: '/testing',
	},
};
