import { Request, Response, NextFunction } from 'express';
import { getConnection } from 'typeorm';

import { KindergartenGroup } from '../../orm/entities/users/KindergartenGroup';

export async function validateUpdateGroup(req: Request, res: Response, next: NextFunction) {
  const { name, childCount } = req.body;

  // ❌ 1. Запрещаем ручное изменение childCount
  if (childCount !== undefined) {
    return res.status(400).json({
      error: 'You cannot update childCount manually',
    });
  }

  // ❌ 2. Проверяем валидность имени группы
  if (name !== undefined && typeof name !== 'string') {
    return res.status(400).json({
      error: 'Group name must be a string',
    });
  }

  const repo = getConnection().getRepository(KindergartenGroup);

  // Ищем группу с таким именем
  const exists = await repo.findOne({ where: { name } });

  // ❌ Если группа с таким названием уже существует
  if (exists) {
    return res.status(400).json({ error: 'Group with this name already exists' });
  }

  return next();
}
