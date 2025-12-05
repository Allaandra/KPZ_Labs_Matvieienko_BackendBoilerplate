import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { KindergartenGroup } from '../orm/entities/users/KindergartenGroup';

export class GroupController {
  static async getAll(req: Request, res: Response) {
    const repo = getRepository(KindergartenGroup);
    const groups = await repo.find({ relations: ['children'] });
    return res.json(groups);
  }

  static async getOne(req: Request, res: Response) {
    const repo = getRepository(KindergartenGroup);
    const group = await repo.findOne({
      where: { id: Number(req.params.id) },
      relations: ['children'],
    });
    return res.json(group);
  }

  static async create(req: Request, res: Response) {
    const repo = getRepository(KindergartenGroup);
    const newGroup = repo.create(req.body);
    await repo.save(newGroup);
    return res.json(newGroup);
  }

  static async update(req: Request, res: Response) {
    const repo = getRepository(KindergartenGroup);
    await repo.update(req.params.id, req.body);
    const updated = await repo.findOne({ where: { id: Number(req.params.id) } });
    return res.json(updated);
  }

  static async delete(req: Request, res: Response) {
    const repo = getRepository(KindergartenGroup);
    await repo.delete(req.params.id);
    return res.json({ message: 'Group deleted' });
  }
}
