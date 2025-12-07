import { Request, Response, NextFunction } from 'express';
import { getConnection } from 'typeorm';

import { KindergartenGroup } from '../../orm/entities/users/KindergartenGroup';

export async function validateDeleteGroup(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);

  // ❗ Проверка ID
  if (isNaN(id)) {
    return res.status(400).json({
      error: 'Invalid group ID (must be a number)',
    });
  }

  const repo = getConnection().getRepository(KindergartenGroup);

  let group;
  try {
    group = await repo.findOne({ where: { id }, relations: ['children'] });
  } catch (err) {
    return res.status(500).json({
      error: 'Database error while loading group',
    });
  }

  // ❗ Группа не найдена
  if (!group) {
    return res.status(404).json({
      error: 'Group not found',
    });
  }

  // ❗ Запрещаем удаление, если есть дети
  if (group.children.length > 0) {
    return res.status(400).json({
      error: `Cannot delete group: it still contains ${group.children.length} children`,
    });
  }

  // Всё ок — продолжаем
  return next();
}
