import { param } from 'express-validator';

const deviceIdValidator = param('deviceId').isString().withMessage('Invalid deviceId');

export const deviceIdParamValidator = [deviceIdValidator];
