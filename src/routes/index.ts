import express from 'express';
import user from './user.routes';

const router = express.Router();

router.use(user);

export default router;

// router.get('/healthcheck', (_, res) => res.sendStatus(200));
