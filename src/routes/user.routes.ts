import {Router} from 'express';
import {UserController} from '../controllers/user.controller.ts';
import {validate} from '../middleware/validate.middleware.ts';
import { registerSchema, loginSchema, updateUserSchema } from '../schemas/user.schema.ts';

const router = Router();

router.post('/register', validate(registerSchema), UserController.register);
router.post('/login', validate(loginSchema), UserController.login);
router.get('/:id', UserController.getProfile);
router.put('/:id', validate(updateUserSchema), UserController.updateProfile);

export default router;