export interface BlogModel {
	name: string;
	description: string;
	websiteUrl: string;
	isMembership: boolean;
	createdAt: string;
}

export type BlogClientModel = {
	id: string;
} & BlogModel;
