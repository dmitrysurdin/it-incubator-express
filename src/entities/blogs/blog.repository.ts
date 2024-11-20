import { BlogModel } from './blog.types';
import { blogCollection } from '../../db/mongo-db';
import { ObjectId, WithId } from 'mongodb';

const create = async (blog: BlogModel): Promise<string> => {
	const result = await blogCollection.insertOne({ ...blog });

	return result.insertedId.toString();
};

const getAll = async (): Promise<Array<WithId<BlogModel>>> => {
	return blogCollection.find({}).toArray();
};

const findById = async (id: string): Promise<WithId<BlogModel> | null> => {
	return blogCollection.findOne({ _id: new ObjectId(id) });
};

const update = async (id: string, updatedBlog: BlogModel): Promise<boolean> => {
	const result = await blogCollection.updateOne(
		{ _id: new ObjectId(id) },
		{ $set: { ...updatedBlog } },
	);

	return !!result.modifiedCount;
};

const remove = async (id: string): Promise<boolean> => {
	const result = await blogCollection.deleteOne({ _id: new ObjectId(id) });

	return !!result.deletedCount;
};

export const blogRepositories = {
	create,
	getAll,
	findById,
	update,
	remove,
};
