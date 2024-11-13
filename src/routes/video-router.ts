import { Router } from 'express';
import { blogController } from '../blogs/blog.controller';

export const videosRouter = Router();

videosRouter.get('/', blogController.getAll);
videosRouter.get('/:id', blogController.findById);
videosRouter.post('/', blogController.create);
videosRouter.put('/:id', blogController.update);
videosRouter.delete('/:id', blogController.remove);
