import { isValidName } from './validation.helpers';
import { Blog } from '../types/blog.types';

interface ValidationErrorType {
	field: string;
	message: string;
}

export const validateVideoFields = (video: Omit<Blog, 'id'>): Array<ValidationErrorType> => {
	const errorsMessages: Array<ValidationErrorType> = [];

	if (!isValidName(video.name)) {
		errorsMessages.push({
			field: 'name',
			message: 'name field is not correct',
		});
	}

	return errorsMessages;
};
