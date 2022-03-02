import express from 'express';
import { loginHandler } from '../controller/session.controller';
import validateResource from '../middleware/validateResource';
import { loginUserSchema } from '../schema/user.schema';

const router = express.Router();

router.post('/api/login', validateResource(loginUserSchema), loginHandler);

export default router;
