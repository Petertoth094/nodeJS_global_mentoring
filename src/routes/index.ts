import express from 'express';
import user from './user.routes';

const router = express.Router();

router.use(user);

router.get('/healthcheck', (_, res) => res.sendStatus(200));

export default router;
