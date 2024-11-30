import { BlogModel } from './blog.types';
import { blogCollection, postCollection } from '../../db/mongo-db';
import { ObjectId, SortDirection, WithId } from 'mongodb';
import { PostModel } from '../posts/post.types';

const create = async (blog: BlogModel): Promise<string> => {
	const result = await blogCollection.insertOne({ ...blog });

	return result.insertedId.toString();
};

const getAll = async ({
	limit,
	skip,
	sortDirection,
	sortBy,
	searchNameTerm,
}: {
	limit: number;
	skip: number;
	sortDirection: SortDirection;
	sortBy: string;
	searchNameTerm: string | null;
}): Promise<{
	totalCount: number;
	items: Array<WithId<BlogModel>>;
}> => {
	const filter = searchNameTerm ? { name: { $regex: searchNameTerm, $options: 'i' } } : {};
	const sortOption: [string, SortDirection][] = [[sortBy, sortDirection]];

	const items = await blogCollection
		.find(filter)
		.sort(sortOption)
		.skip(skip)
		.limit(limit)
		.toArray();
	const totalCount = await blogCollection.countDocuments(filter);

	return { items, totalCount };
};

const getAllPostsByBlogId = async ({
	blogId,
	limit,
	skip,
	sortDirection,
	sortBy,
	searchNameTerm,
}: {
	blogId: string;
	limit: number;
	skip: number;
	sortDirection: SortDirection;
	sortBy: string;
	searchNameTerm: string | null;
}): Promise<{
	totalCount: number;
	items: Array<WithId<PostModel>>;
}> => {
	const filter = searchNameTerm ? { name: { $regex: searchNameTerm, $options: 'i' } } : { blogId };
	const sortOption: [string, SortDirection][] = [[sortBy, sortDirection]];

	const items = await postCollection
		.find(filter)
		.sort(sortOption)
		.skip(skip)
		.limit(limit)
		.toArray();
	const totalCount = await postCollection.countDocuments(filter);

	return { items, totalCount };
};

const findById = async (id: string): Promise<WithId<BlogModel> | null> => {
	return blogCollection.findOne({ _id: new ObjectId(id) });
};

const update = async (id: string, updatedBlog: BlogModel): Promise<boolean> => {
	const { name, description, websiteUrl } = updatedBlog;
	const result = await blogCollection.updateOne(
		{ _id: new ObjectId(id) },
		{ $set: { name, description, websiteUrl } },
	);

	return !!result.matchedCount;
};

const remove = async (id: string): Promise<boolean> => {
	const result = await blogCollection.deleteOne({ _id: new ObjectId(id) });

	return !!result.deletedCount;
};

export const blogRepositories = {
	create,
	getAll,
	getAllPostsByBlogId,
	findById,
	update,
	remove,
};
