export interface BlogModel {
	name: string;
	description: string;
	websiteUrl: string;
}

export type BlogClientModel = {
	id: string;
} & BlogModel;
