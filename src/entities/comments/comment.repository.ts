import { CommentClientModel, CommentDbModel } from './comment.types';
import { CommentModelClass } from '../../db/models';
import { ObjectId, WithId } from 'mongodb';

const findById = async (id: string): Promise<WithId<CommentDbModel> | null> => {
	return CommentModelClass.findById(id).lean();
};

const update = async (updatedComment: CommentClientModel): Promise<boolean> => {
	const { content, createdAt, commentatorInfo, id } = updatedComment;
	const result = await CommentModelClass.updateOne(
		{ _id: new ObjectId(id) },
		{ $set: { content, createdAt, commentatorInfo } },
	);
	return result.matchedCount > 0;
};

const remove = async (id: string): Promise<boolean> => {
	const result = await CommentModelClass.deleteOne({ _id: new ObjectId(id) });

	return result.deletedCount > 0;
};

export const commentRepositories = {
	findById,
	update,
	remove,
};
