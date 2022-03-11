import express from 'express';

import validateResource from '../middleware/validateResource';

import {
  createUserHandler,
  deleteUserHandler,
  getAutoSuggestUsersHandler,
  getUserByIdHandler,
  getUsersHandler,
  removeUserHandler,
  updateUserHandler
} from '../controller/user.controller';

import {
  createUserSchema,
  deleteUserSchema,
  getUserByIdSchema,
  updateUserSchema
} from '../schema/user.schema';

const router = express.Router();

router.post(
  '/api/users',
  validateResource(createUserSchema),
  createUserHandler
);

router.get('/api/users', getUsersHandler);

router.get(
  '/api/users/:id',
  validateResource(getUserByIdSchema),
  getUserByIdHandler
);

router.put(
  '/api/users/:id',
  validateResource(updateUserSchema),
  updateUserHandler
);

router.get('/api/users/:loginSubStr/:limit', getAutoSuggestUsersHandler);

router.delete(
  '/api/users/:id',
  validateResource(deleteUserSchema),
  removeUserHandler
);

router.delete(
  '/api/users/delete/:id',
  validateResource(deleteUserSchema),
  deleteUserHandler
);

export default router;
