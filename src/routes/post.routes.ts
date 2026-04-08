import {Router} from 'express';
import {PostController} from '../controllers/post.controller.ts';
import { authMiddleware } from '../middleware/auth.middleware.ts';
import {validate} from '../middleware/validate.middleware.ts';
import { createPostSchema,updatePostSchema } from '../schemas/post.schema.ts';

const router = Router();

router.get('/', PostController.getAll);
router.get('/:id', PostController.getById);
router.post('/', authMiddleware, validate(createPostSchema), PostController.create);
router.put('/:id', authMiddleware, validate(updatePostSchema), PostController.update);
router.delete('/:id', authMiddleware, PostController.delete);

export default router;