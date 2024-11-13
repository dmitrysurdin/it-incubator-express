import express from 'express';
import { SETTINGS } from './settings';
import { testingRouter } from './routes/testing-router';
import { blogsRouter } from './routes/blogs-router';
import { postsRouter } from './routes/posts-router';

export const app = express();

app.use(express.json());

app.use(SETTINGS.PATH.BLOGS, blogsRouter);
app.use(SETTINGS.PATH.POSTS, postsRouter);
app.use(SETTINGS.PATH.TESTING, testingRouter);
