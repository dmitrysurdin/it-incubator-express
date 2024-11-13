export const isString = (value: unknown): value is string => {
	return typeof value === 'string';
};

export const isValidName = (title: string): boolean => {
	return isString(title) && !!title.trim() && title.length < 40;
};
