import { Router } from 'express';
import { login, refreshToken, register } from '../controller/authController.js';

const authRouter = Router();

/**
 * POST /api/auth/register
 */
authRouter.post('/register', register);

/**
 * POST /api/auth/login
 */
authRouter.post('/login', login);

/**
 * POST api/auth/refresh-token
 */
authRouter.post('/refresh-token', refreshToken);

export default authRouter;
