import { mapCommentFromDb } from './comment.helpers';
import { CommentClientModel, CommentInputModel } from './comment.types';
import { commentRepositories } from './comment.repository';

const findById = async (id: string): Promise<CommentClientModel | null> => {
	const commentFromDb = await commentRepositories.findById(id);

	if (!commentFromDb) {
		return null;
	}

	return mapCommentFromDb(commentFromDb);
};

const update = async (newCommentData: CommentClientModel): Promise<boolean> => {
	return await commentRepositories.update(newCommentData);
};

const remove = async (id: string): Promise<boolean> => {
	return await commentRepositories.remove(id);
};

export const commentServices = {
	findById,
	update,
	remove,
};
