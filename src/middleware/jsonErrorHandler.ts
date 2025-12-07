import { Request, Response, NextFunction } from 'express';

export function jsonErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof SyntaxError && (err as any).body) {
    return res.status(400).json({
      error: 'Invalid JSON format',
    });
  }

  return next(err);
}
