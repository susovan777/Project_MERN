import { Router } from 'express';
import { register } from '../controller/authController.js';

const authRouter = Router();

/**
 * POST /api/auth/register
 */
authRouter.post('/register', register);

export default authRouter;
