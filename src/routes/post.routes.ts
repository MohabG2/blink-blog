import {Router} from 'express';
import {PostController} from '../controllers/post.controller.ts';
import {validate} from '../middleware/validate.middleware.ts';
import { createPostSchema,updatePostSchema } from '../schemas/post.schema.ts';

const router = Router();

router.get('/', PostController.getAll);
router.get('/:id', PostController.getById);
router.post('/', validate(createPostSchema), PostController.create);
router.put('/:id', validate(updatePostSchema), PostController.update);
router.delete('/:id', PostController.delete);

export default router;