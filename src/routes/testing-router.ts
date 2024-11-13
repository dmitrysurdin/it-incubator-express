import { Router } from 'express';
import { testingControllers } from '../testing/testing.controller';

export const testingRouter = Router();

testingRouter.delete('/all-data', testingControllers.clearDb);
