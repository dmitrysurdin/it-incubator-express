import { BlogClientModel } from '../entities/blogs/blog.types';
import { PostClientModel } from '../entities/posts/post.types';

interface DBType {
	blogs: Array<BlogClientModel>;
	posts: Array<PostClientModel>;
}

export const dbData: DBType = {
	blogs: [
		{
			id: '1731528420778',
			name: 'Tech Chronicles',
			description: 'A blog covering the latest in tech, software engineering, and best practices.',
			websiteUrl: 'https://techchronicles.com',
		},
		{
			id: '1731528430487',
			name: 'Mindful Coding',
			description: 'Exploring mindful and sustainable software development practices.',
			websiteUrl: 'https://mindfulcoding.org',
		},
	],
	posts: [
		{
			id: '1731528439557',
			title: 'Understanding TypeScript',
			shortDescription: "A quick overview of TypeScript's key features and benefits.",
			content:
				'TypeScript is a powerful tool for modern JavaScript development, adding static types to enhance reliability and readability...',
			blogId: '1731528420778',
			blogName: 'Tech Chronicles',
		},
		{
			id: '1731528448571',
			title: 'React Hooks Deep Dive',
			shortDescription: 'Exploring the power of React hooks in building dynamic applications.',
			content:
				'React hooks, introduced in React 16.8, revolutionized functional components by enabling them to manage state and side effects...',
			blogId: '1731528430487',
			blogName: 'Mindful Coding',
		},
	],
};
