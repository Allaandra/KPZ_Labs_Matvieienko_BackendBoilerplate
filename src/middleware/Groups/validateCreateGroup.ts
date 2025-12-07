import { Request, Response, NextFunction } from 'express';
import { getConnection } from 'typeorm';

import { KindergartenGroup } from '../../orm/entities/users/KindergartenGroup';

export async function validateCreateGroup(req: Request, res: Response, next: NextFunction) {
  const { name, childCount } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Group name is required' });
  }

  if (typeof name !== 'string') {
    return res.status(400).json({ error: 'Group name must be a string' });
  }

  const repo = getConnection().getRepository(KindergartenGroup);

  const exists = await repo.findOne({ where: { name } });

  if (exists) {
    return res.status(400).json({ error: 'Group with this name already exists' });
  }

  if (childCount !== undefined) {
    return res.status(400).json({ error: 'childCount cannot be set manually' });
  }

  return next();
}
