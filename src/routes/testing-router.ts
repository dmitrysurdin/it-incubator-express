import { Router } from 'express';
import { testingControllers } from '../entities/testing/testing.controller';

export const testingRouter = Router();

testingRouter.delete('/all-data', testingControllers.clearDb);
