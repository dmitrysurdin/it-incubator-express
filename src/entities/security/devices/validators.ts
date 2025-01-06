import { param } from 'express-validator';

const deviceIdValidator = param('deviceId').isString().withMessage('Invalid blogId');

export const deviceIdParamValidator = [deviceIdValidator];
