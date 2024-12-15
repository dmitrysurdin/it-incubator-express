import { commentsCollection } from '../../db/mongo-db';
import { ObjectId, WithId } from 'mongodb';
import { CommentClientModel, CommentDBModel } from './comment.types';

const findById = async (id: string): Promise<WithId<CommentDBModel> | null> => {
	return commentsCollection.findOne({ _id: new ObjectId(id) });
};

const update = async (updatedComment: CommentClientModel): Promise<boolean> => {
	const { content, createdAt, commentatorInfo, id } = updatedComment;
	const result = await commentsCollection.updateOne(
		{ _id: new ObjectId(id) },
		{ $set: { content, createdAt, commentatorInfo } },
	);

	return !!result.matchedCount;
};

const remove = async (id: string): Promise<boolean> => {
	const result = await commentsCollection.deleteOne({ _id: new ObjectId(id) });

	return !!result.deletedCount;
};

export const commentRepositories = {
	findById,
	update,
	remove,
};
