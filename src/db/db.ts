import { Blog } from '../blogs/types/blog.types';

interface DBType {
	blogs: Array<Blog>;
}

export const dbData: DBType = {
	blogs: [
		{
			id: '1',
			name: 'Tech Chronicles',
			description: 'A blog covering the latest in tech, software engineering, and best practices.',
			websiteUrl: 'https://techchronicles.com',
		},
		{
			id: '2',
			name: 'Mindful Coding',
			description: 'Exploring mindful and sustainable software development practices.',
			websiteUrl: 'https://mindfulcoding.org',
		},
	],
};
