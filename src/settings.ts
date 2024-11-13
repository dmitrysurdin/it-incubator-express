import { config } from 'dotenv';

config();

export const SETTINGS = {
	PORT: process.env.PORT || 3003,
	PATH: {
		BLOGS: '/blogs',
		POSTS: '/posts',
		TESTING: '/testing',
	},
};
