import express from 'express';
import cookieParser from 'cookie-parser';
import { SETTINGS } from './settings';
import { testingRouter } from './routes/testing-router';
import { blogsRouter } from './routes/blogs-router';
import { postsRouter } from './routes/posts-router';
import { usersRouter } from './routes/users-router';
import { authRouter } from './routes/auth-router';
import { commentsRouter } from './routes/comments-router';
import { securityRouter } from './routes/security-router';

export const app = express();

app.use(express.json());
app.use(cookieParser());
app.set('trust proxy', true);

app.use(SETTINGS.PATH.BLOGS, blogsRouter);
app.use(SETTINGS.PATH.POSTS, postsRouter);
app.use(SETTINGS.PATH.COMMENTS, commentsRouter);
app.use(SETTINGS.PATH.USERS, usersRouter);
app.use(SETTINGS.PATH.AUTH, authRouter);
app.use(SETTINGS.PATH.SECURITY, securityRouter);
app.use(SETTINGS.PATH.TESTING, testingRouter);
