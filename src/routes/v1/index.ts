import { Router } from 'express';

import auth from './auth';
import childRoutes from './child.routes';
import groupRoutes from './group.routes';
import users from './users';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/children', childRoutes);
router.use('/groups', groupRoutes);

export default router;
