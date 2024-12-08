import { query } from 'express-validator';

export const searchNameTermValidator = query('searchNameTerm')
	.isString()
	.withMessage('searchNameTerm should be a string')
	.trim()
	.optional();
