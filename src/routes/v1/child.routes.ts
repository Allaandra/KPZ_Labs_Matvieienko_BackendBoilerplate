import { Router } from 'express';

import { ChildController } from '../../controllers/ChildController';

const router = Router();

router.get('/', ChildController.getAll);
router.get('/:id', ChildController.getOne);
router.post('/', ChildController.create);
router.delete('/:id', ChildController.delete);

export default router;
