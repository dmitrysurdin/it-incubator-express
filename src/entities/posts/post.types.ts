export interface PostModel {
	title: string;
	shortDescription: string;
	content: string;
	blogId: string;
	blogName: string;
	createdAt: string;
}

export type PostClientModel = {
	id: string;
} & PostModel;
