import { Request, Response, NextFunction } from 'express';
import { getConnection } from 'typeorm';

import { KindergartenGroup } from '../../orm/entities/users/KindergartenGroup';

export async function validateCreateGroup(req: Request, res: Response, next: NextFunction) {
  const { name, childCount } = req.body;

  // 1. Название обязательно
  if (!name) {
    return res.status(400).json({ error: 'Group name is required' });
  }

  // 2. Название должно быть строкой
  if (typeof name !== 'string') {
    return res.status(400).json({ error: 'Group name must be a string' });
  }

  const repo = getConnection().getRepository(KindergartenGroup);

  // Ищем группу с таким именем
  const exists = await repo.findOne({ where: { name } });

  // ❌ Если группа с таким названием уже существует
  if (exists) {
    return res.status(400).json({ error: 'Group with this name already exists' });
  }

  // 3. childCount нельзя передавать вручную
  if (childCount !== undefined) {
    return res.status(400).json({ error: 'childCount cannot be set manually' });
  }

  return next();
}
