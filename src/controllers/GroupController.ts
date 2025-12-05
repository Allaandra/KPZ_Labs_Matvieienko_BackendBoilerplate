import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { KindergartenGroup } from '../orm/entities/users/KindergartenGroup';

export class GroupController {
  static async getAllGroups(req: Request, res: Response) {
    const repo = getRepository(KindergartenGroup);
    const groups = await repo.find({ relations: ['children'] });
    return res.json(groups);
  }

  static async getGroupById(req: Request, res: Response) {
    const repo = getRepository(KindergartenGroup);
    const group = await repo.findOne({
      where: { id: Number(req.params.id) },
      relations: ['children'],
    });
    return res.json(group);
  }

  static async createGroup(req: Request, res: Response) {
    const repo = getRepository(KindergartenGroup);
    const newGroup = repo.create(req.body);
    await repo.save(newGroup);
    return res.json(newGroup);
  }

  static async updateGroup(req: Request, res: Response) {
    const repo = getRepository(KindergartenGroup);
    await repo.update(req.params.id, req.body);
    const updated = await repo.findOne({ where: { id: Number(req.params.id) } });
    return res.json(updated);
  }

  static async deleteGroup(req: Request, res: Response) {
    const repo = getRepository(KindergartenGroup);
    await repo.delete(req.params.id);
    return res.json({ message: 'Group deleted' });
  }
}
