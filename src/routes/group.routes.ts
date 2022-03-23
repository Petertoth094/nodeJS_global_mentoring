import express from 'express';

import validateResource from '../middleware/validateResource';

import {
  addUsersToGroupHandler,
  createGroupHandler,
  deleteGroupHandler,
  getGroupByIdHandler,
  getGroupsHandler,
  updateGroupHandler
} from '../controller/group.controller';

import {
  createGroupSchema,
  getGroupByIdSchema,
  updateGroupSchema
} from '../schema/group.schema';

const router = express.Router();

router.post(
  '/api/groups',
  validateResource(createGroupSchema),
  createGroupHandler
);

router.get('/api/groups', getGroupsHandler);

router.get(
  '/api/groups/:id',
  validateResource(getGroupByIdSchema),
  getGroupByIdHandler
);

router.put(
  '/api/groups/:id',
  validateResource(updateGroupSchema),
  updateGroupHandler
);

router.delete(
  '/api/groups/:id',
  validateResource(getGroupByIdSchema),
  deleteGroupHandler
);

router.post('/api/groups/addUser/:id', addUsersToGroupHandler);

export default router;
