export interface BlogDbModel {
	name: string;
	description: string;
	websiteUrl: string;
	isMembership: boolean;
	createdAt: string;
}

export type BlogClientModel = {
	id: string;
} & BlogDbModel;
