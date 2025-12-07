import { Request, Response, NextFunction } from 'express';
import isEmpty from 'validator/lib/isEmpty';

export async function validateCreateChild(req: Request, res: Response, next: NextFunction) {
  const { firstName, lastName, birthdayDate, groupId } = req.body;

  if (isEmpty(firstName || '')) {
    return res.status(400).json({ error: 'First name is required' });
  }

  if (isEmpty(lastName || '')) {
    return res.status(400).json({ error: 'Last name is required' });
  }

  if (!birthdayDate) {
    return res.status(400).json({ error: 'Birthday date is required' });
  }

  if (!groupId) {
    return res.status(400).json({ error: 'groupId is required' });
  }

  return next();
}
