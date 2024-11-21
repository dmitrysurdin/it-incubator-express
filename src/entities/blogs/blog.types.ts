export interface BlogModel {
	name: string;
	description: string;
	websiteUrl: string;
	isMembership: boolean;
	createdAt: Date;
}

export type BlogClientModel = {
	id: string;
} & BlogModel;
