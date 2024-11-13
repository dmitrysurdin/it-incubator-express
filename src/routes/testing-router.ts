import { Router } from 'express';
import { clearBlogsController } from '../blogs/controllers/clearBlogsController';

export const testingRouter = Router();

testingRouter.delete('/all-data', clearBlogsController);
