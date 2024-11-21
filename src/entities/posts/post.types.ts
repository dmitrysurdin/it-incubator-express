export interface PostModel {
	title: string;
	shortDescription: string;
	content: string;
	blogId: string;
	blogName: string;
}

export type PostClientModel = {
	id: string;
} & PostModel;
