import { Request, Response, NextFunction } from 'express';
import { getConnection } from 'typeorm';

import { KindergartenGroup } from '../../orm/entities/users/KindergartenGroup';

export async function validateGroupIdExists(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);

  // ❌ 1. Проверка валидности ID
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid group ID' });
  }

  const repo = getConnection().getRepository(KindergartenGroup);
  const group = await repo.findOne({ where: { id }, relations: ['children'] });

  // ❌ 2. Группа не найдена
  if (!group) {
    return res.status(404).json({ error: 'Group not found' });
  }

  // Сохраняем группу в запрос — сервису повторно искать не нужно
  (req as any).group = group;

  return next();
}
