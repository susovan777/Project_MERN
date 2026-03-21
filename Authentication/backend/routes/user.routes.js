import { Router } from 'express';
import { login, register } from '../controller/authController.js';

const authRouter = Router();

/**
 * POST /api/auth/register
 */
authRouter.post('/register', register);

/**
 * POST /api/auth/login
 */
authRouter.post('/login', login)

export default authRouter;
