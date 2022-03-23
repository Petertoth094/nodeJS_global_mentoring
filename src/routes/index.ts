import express from 'express';
import user from './user.routes';
import group from './group.routes';
import session from './session.routes';

import verifyAccesToken from '../middleware/verifyAccesToken.middleware';

const router = express.Router();

router.use(session);
router.use(verifyAccesToken);
router.use(user);
router.use(group);

export default router;
