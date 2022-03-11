import express from 'express';
import user from './user.routes';
import group from './group.routes';

const router = express.Router();

router.use(user);
router.use(group);

export default router;
