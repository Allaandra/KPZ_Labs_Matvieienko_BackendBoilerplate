import { Router } from 'express';

import { ChildController } from '../../controllers/ChildController';
import { validateCreateChild } from '../../middleware/Children/validateCreateChild';
import { validateUpdateChild } from '../../middleware/Children/validateUpdateChild';

const router = Router();

router.get('/', ChildController.findAll);
router.get('/:id', ChildController.findOne);
router.post('/', validateCreateChild, ChildController.create);
router.put('/:id', validateUpdateChild, ChildController.update);
router.delete('/:id', ChildController.delete);

export default router;
