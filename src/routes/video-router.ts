import { Router } from 'express';
import { getBlogsController } from '../blogs/controllers/getBlogsController';
import { findBlogController } from '../blogs/controllers/findBlogController';
import { createBlogController } from '../blogs/controllers/createBlogController';
import { updateBlogController } from '../blogs/controllers/updateBlogController';
import { deleteBlogController } from '../blogs/controllers/deleteBlogController';

export const videosRouter = Router();

videosRouter.get('/', getBlogsController);
videosRouter.get('/:id', findBlogController);
videosRouter.post('/', createBlogController);
videosRouter.put('/:id', updateBlogController);
videosRouter.delete('/:id', deleteBlogController);
