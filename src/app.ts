import express from 'express';
import { SETTINGS } from './settings';
import { videosRouter } from './routes/video-router';
import { testingRouter } from './routes/testing-router';

export const app = express();

app.use(express.json());

app.use(SETTINGS.PATH.BLOGS, videosRouter);
app.use(SETTINGS.PATH.TESTING, testingRouter);
