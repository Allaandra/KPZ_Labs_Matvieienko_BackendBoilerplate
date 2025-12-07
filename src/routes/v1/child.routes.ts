import { Router } from 'express';

import { ChildController } from '../../controllers/ChildController';
import { validateChildIdExists } from '../../middleware/Children/validateChildIdExists';
import { validateCreateChild } from '../../middleware/Children/validateCreateChild';
import { validateUpdateChild } from '../../middleware/Children/validateUpdateChild';

const router = Router();

router.post('/', validateCreateChild, ChildController.create);

router.get('/', ChildController.findAll);
router.get('/:id', validateChildIdExists, ChildController.findOne);

router.put('/:id', validateChildIdExists, validateUpdateChild, ChildController.update);

router.delete('/:id', validateChildIdExists, ChildController.delete);

export default router;
