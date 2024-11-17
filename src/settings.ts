import { config } from 'dotenv';

config();

export const SETTINGS = {
	PORT: process.env.PORT || 3003,
	LOGIN: process.env.LOGIN,
	PASSWORD: process.env.PASSWORD,
	PATH: {
		BLOGS: '/blogs',
		POSTS: '/posts',
		TESTING: '/testing',
	},
};
