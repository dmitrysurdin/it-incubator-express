export interface PostModel {
	title: string;
	shortDescription: string;
	content: string;
	blogId: string;
	blogName: string;
	createdAt: Date;
}

export type PostClientModel = {
	id: string;
} & PostModel;
