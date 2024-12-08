import { query } from 'express-validator';

export const searchLoginTermValidator = query('searchLoginTerm')
	.isString()
	.withMessage('searchLoginTerm should be a string')
	.trim()
	.optional();

export const searchEmailTermValidator = query('searchEmailTerm')
	.isString()
	.withMessage('searchEmailTerm should be a string')
	.trim()
	.optional();
