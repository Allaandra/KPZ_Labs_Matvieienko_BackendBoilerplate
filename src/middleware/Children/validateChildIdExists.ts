import { Request, Response, NextFunction } from 'express';
import { getConnection } from 'typeorm';

import { Child } from '../../orm/entities/users/Child';

export async function validateChildIdExists(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);

  // ❌ 1. Проверка валидности ID
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid child ID' });
  }

  const repo = getConnection().getRepository(Child);

  // Ищем ребёнка вместе с группой
  const child = await repo.findOne({
    where: { id },
    relations: ['group'],
  });

  // ❌ 2. Ребёнок не найден
  if (!child) {
    return res.status(404).json({ error: 'Child not found' });
  }

  // Сохраняем ребёнка в запрос — сервису повторно искать не нужно
  (req as any).child = child;

  return next();
}
