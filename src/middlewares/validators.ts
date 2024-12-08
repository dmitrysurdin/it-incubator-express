import { param, query } from 'express-validator';
import { allowedSortDirections } from '../const';

const pageSizeValidator = query('pageSize')
	.isInt({ min: 1 })
	.withMessage('pageSize must be an integer greater than or equal to 1')
	.optional();

const pageNumberValidator = query('pageNumber')
	.isInt({ min: 1 })
	.withMessage('pageNumber must be an integer greater than or equal to 1')
	.optional();

const sortDirectionValidator = query('sortDirection')
	.custom((direction) => {
		if (direction && !allowedSortDirections.includes(direction)) {
			throw new Error("Sort direction should have only 'desc' or 'asc' values");
		}
		return true;
	})
	.optional();

const sortByValidator = query('sortBy')
	.isString()
	.withMessage('sortBy should be a string')
	.trim()
	.optional();

export const paginationQueryValidator = [
	pageSizeValidator,
	pageNumberValidator,
	sortDirectionValidator,
	sortByValidator,
];

export const mongoIdParamsValidator = [
	param('id').isMongoId().withMessage('Invalid ID format. Must be a valid MongoDB ObjectId.'),
];
