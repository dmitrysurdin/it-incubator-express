import { PostModel } from './post.types';
import { ObjectId, WithId } from 'mongodb';
import { postCollection } from '../../db/mongo-db';

const create = async (post: PostModel): Promise<string> => {
	const result = await postCollection.insertOne({ ...post });

	return result.insertedId.toString();
};

const getAll = async (): Promise<Array<WithId<PostModel>>> => {
	return postCollection.find({}).toArray();
};

const findById = async (id: string): Promise<WithId<PostModel> | null> => {
	return postCollection.findOne({ _id: new ObjectId(id) });
};

const update = async (id: string, updatedPost: PostModel): Promise<boolean> => {
	const { title, shortDescription, content, blogName, blogId } = updatedPost;
	const result = await postCollection.updateOne(
		{ _id: new ObjectId(id) },
		{ $set: { title, shortDescription, content, blogName, blogId } },
	);

	return !!result.matchedCount;
};

const remove = async (id: string): Promise<boolean> => {
	const result = await postCollection.deleteOne({ _id: new ObjectId(id) });

	return !!result.deletedCount;
};

export const postRepositories = {
	create,
	getAll,
	findById,
	update,
	remove,
};
