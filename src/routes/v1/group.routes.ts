import { Router } from 'express';

import { GroupController } from '../../controllers/GroupController';

const router = Router();

router.get('/', GroupController.getAllGroups);
router.get('/:id', GroupController.getGroupById);
router.post('/', GroupController.createGroup);
router.put('/:id', GroupController.updateGroup);
router.delete('/:id', GroupController.deleteGroup);

export default router;
