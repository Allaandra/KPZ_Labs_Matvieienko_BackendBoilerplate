import { Request, Response } from 'express';

import { GroupResponseDTO } from '../dto/GroupResponseDTO';
import { GroupService } from '../services/GroupService';

export class GroupController {
  static async findAll(_req: Request, res: Response) {
    const service = new GroupService();
    const groups = await service.findAll();

    return res.json(groups.map((g) => new GroupResponseDTO(g, false)));
  }

  static async findOne(req: Request, res: Response) {
    const service = new GroupService();
    const group = await service.findOne(Number(req.params.id));

    return res.json(new GroupResponseDTO(group, true));
  }

  static async create(req: Request, res: Response) {
    const service = new GroupService();

    const group = await service.create({
      name: req.body.name,
    });

    return res.status(201).json(new GroupResponseDTO(group));
  }

  static async update(req: Request, res: Response) {
    const service = new GroupService();
    const id = Number(req.params.id);

    const group = await service.update(id, {
      name: req.body.name,
    });

    return res.json(new GroupResponseDTO(group));
  }

  static async delete(req: Request, res: Response) {
    const service = new GroupService();
    const id = Number(req.params.id);

    await service.delete(id);

    return res.json({ message: 'Group deleted successfully' });
  }
}
