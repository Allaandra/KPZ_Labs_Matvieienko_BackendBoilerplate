import { Router } from 'express';

import { GroupController } from '../../controllers/GroupController';
import { validateCreateGroup } from '../../middleware/Groups/validateCreateGroup';
import { validateDeleteGroup } from '../../middleware/Groups/validateDeleteGroup';
import { validateGroupIdExists } from '../../middleware/Groups/validateGroupIdExists';
import { validateUpdateGroup } from '../../middleware/Groups/validateUpdateGroup';

const router = Router();

router.post('/', validateCreateGroup, GroupController.create);

router.get('/', GroupController.findAll);
router.get('/:id', validateGroupIdExists, GroupController.findOne);

router.put('/:id', validateGroupIdExists, validateUpdateGroup, GroupController.update);

router.delete('/:id', validateGroupIdExists, validateDeleteGroup, GroupController.delete);

export default router;
