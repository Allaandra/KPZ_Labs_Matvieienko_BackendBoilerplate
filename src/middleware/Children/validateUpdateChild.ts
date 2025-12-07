import { Request, Response, NextFunction } from 'express';

export async function validateUpdateChild(req: Request, res: Response, next: NextFunction) {
  const { groupId, firstName, lastName, birthdayDate } = req.body;

  if (groupId !== undefined && isNaN(Number(groupId))) {
    return res.status(400).json({
      error: 'groupId must be a number',
    });
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

  if (birthdayDate !== undefined && isNaN(Date.parse(birthdayDate))) {
    return res.status(400).json({
      error: 'birthdayDate must be a valid date',
    });
  }

  return next();
}
