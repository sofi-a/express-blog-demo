import express from 'express';

import { login, register } from '../../controllers/auth';
import {
  login as loginSchema,
  register as registerSchema,
} from '../../validations/auth';
import validate from '../../middlewares/validation';

const router = express.Router();

/**
 * POST api/v1/auth/login
 */
router.post('/login', loginSchema, validate, login);

/**
 * POST api/v1/auth/register
 */
router.post('/register', registerSchema, validate, register);

export default router;
