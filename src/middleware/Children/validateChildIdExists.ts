import { Request, Response, NextFunction } from 'express';
import { getConnection } from 'typeorm';

import { Child } from '../../orm/entities/users/Child';

export async function validateChildIdExists(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid child ID' });
  }

  const repo = getConnection().getRepository(Child);

  const child = await repo.findOne({
    where: { id },
    relations: ['group'],
  });

  if (!child) {
    return res.status(404).json({ error: 'Child not found' });
  }

  (req as any).child = child;

  return next();
}
