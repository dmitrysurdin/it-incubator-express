import { BlogDbModel } from './blog.types';
import { PostDbModel } from '../posts/post.types';
import { SortOrder } from 'mongoose';
import { BlogModelClass, PostModelClass } from '../../db/models';
import { WithId } from 'mongodb';

const create = async (blog: BlogDbModel): Promise<string> => {
	const result = await BlogModelClass.create(blog);
	return result._id.toString();
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
	sortDirection: SortOrder;
	sortBy: string;
	searchNameTerm: string | null;
}): Promise<{
	totalCount: number;
	items: Array<WithId<BlogDbModel>>;
}> => {
	const filter = searchNameTerm ? { name: { $regex: searchNameTerm, $options: 'i' } } : {};

	const items = await BlogModelClass.find(filter)
		.sort({ [sortBy]: sortDirection })
		.skip(skip)
		.limit(limit)
		.lean();

	const totalCount = await BlogModelClass.countDocuments(filter);

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
	sortDirection: SortOrder;
	sortBy: string;
	searchNameTerm: string | null;
}): Promise<{
	totalCount: number;
	items: Array<WithId<PostDbModel>>;
}> => {
	const filter = searchNameTerm
		? { blogId, name: { $regex: searchNameTerm, $options: 'i' } }
		: { blogId };

	const items = await PostModelClass.find(filter)
		.sort({ [sortBy]: sortDirection })
		.skip(skip)
		.limit(limit)
		.lean();

	const totalCount = await PostModelClass.countDocuments(filter);

	return { items, totalCount };
};

const findById = async (id: string): Promise<WithId<BlogDbModel> | null> => {
	return BlogModelClass.findById(id).lean();
};

const update = async (id: string, updatedBlog: Partial<BlogDbModel>): Promise<boolean> => {
	const result = await BlogModelClass.updateOne({ _id: id }, { $set: updatedBlog });

	return result.matchedCount > 0;
};

const remove = async (id: string): Promise<boolean> => {
	const result = await BlogModelClass.deleteOne({ _id: id });

	return result.deletedCount > 0;
};

export const blogRepositories = {
	create,
	getAll,
	getAllPostsByBlogId,
	findById,
	update,
	remove,
};
