import { Router } from 'express';
import * as UserController from '../controllers/user.controller';

const router = new Router();

// Sign up
router.route('/users').post(UserController.registerUser);

export default router;
