import express from 'express';

import {
  createUserHandler,
  getAutoSuggestUsersHandler,
  getUserByIdHandler,
  getUsersHandler,
  removeUserHandler,
  updateUserHandler
} from '../controller/user.controller';

import validateResource from '../middleware/validateResource';
import {
  createUserSchema,
  deleteUserSchema,
  getUserByIdSchema,
  updateUserSchema
} from '../schema/user.schema';

const router = express.Router();

router.post('/api/user', validateResource(createUserSchema), createUserHandler);

router.get('/api/users', getUsersHandler);

router.get(
  '/api/user/:id',
  validateResource(getUserByIdSchema),
  getUserByIdHandler
);

router.put(
  '/api/user/:id',
  validateResource(updateUserSchema),
  updateUserHandler
);

router.get('/api/users/:loginSubStr/:limit', getAutoSuggestUsersHandler);

router.delete(
  '/api/user/:id',
  validateResource(deleteUserSchema),
  removeUserHandler
);

export default router;
