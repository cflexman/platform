import { Router } from 'express';
import * as SessionController from '../controllers/session.controller';

const router = new Router();

// Login user
router.route('/session').post(SessionController.login);

// Logout user
router.route('/session').delete(SessionController.logout);

export default router;
