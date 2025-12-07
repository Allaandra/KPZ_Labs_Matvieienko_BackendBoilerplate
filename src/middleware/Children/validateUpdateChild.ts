import { Request, Response, NextFunction } from 'express';
import { getConnection } from 'typeorm';

import { KindergartenGroup } from '../../orm/entities/users/KindergartenGroup';

export async function validateUpdateChild(req: Request, res: Response, next: NextFunction) {
  const { groupId, firstName, lastName, patronymic, birthdayDate } = req.body;

  if (groupId !== undefined) {
    if (isNaN(Number(groupId))) {
      return res.status(400).json({
        error: 'groupId must be a number',
      });
    }

    const repo = getConnection().getRepository(KindergartenGroup);

    const group = await repo.findOne({
      where: { id: Number(groupId) },
    });

    if (!group) {
      return res.status(404).json({
        error: 'Group with this ID does not exist',
      });
    }

    (req as any).newGroup = group;
  }

  if (firstName !== undefined && typeof firstName !== 'string') {
    return res.status(400).json({
      error: 'firstName must be a string',
    });
  }

  if (lastName !== undefined && typeof lastName !== 'string') {
    return res.status(400).json({
      error: 'lastName must be a string',
    });
  }

  if (patronymic !== undefined) {
    if (typeof patronymic !== 'string') {
      return res.status(400).json({
        error: 'patronymic must be a string',
      });
    }
  }

  if (birthdayDate !== undefined && isNaN(Date.parse(birthdayDate))) {
    return res.status(400).json({
      error: 'birthdayDate must be a valid date',
    });
  }

  return next();
}
