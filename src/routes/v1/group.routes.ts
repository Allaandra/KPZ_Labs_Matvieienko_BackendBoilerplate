import { Router } from 'express';

import { GroupController } from '../../controllers/GroupController';

const router = Router();

router.get('/', GroupController.getAll);
router.get('/:id', GroupController.getOne);
router.post('/create', GroupController.create);
router.put('/:id', GroupController.update);
router.delete('/:id', GroupController.delete);

export default router;
