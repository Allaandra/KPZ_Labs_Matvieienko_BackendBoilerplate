import { Request, Response } from 'express';

import { ChildResponseDTO } from '../dto/ChildResponseDTO';
import { ChildService } from '../services/ChildService';

export class ChildController {
  static async findAll(_req: Request, res: Response) {
    const service = new ChildService();
    const children = await service.findAll();
    return res.json(children.map((c) => new ChildResponseDTO(c)));
  }

  static async findOne(req: Request, res: Response) {
    const service = new ChildService();
    const child = await service.findOne(Number(req.params.id));
    return res.json(new ChildResponseDTO(child));
  }

  static async create(req: Request, res: Response) {
    const service = new ChildService();
    const child = await service.create(req.body);
    return res.status(201).json(new ChildResponseDTO(child));
  }

  static async update(req: Request, res: Response) {
    const service = new ChildService();
    const child = await service.update(Number(req.params.id), req.body);
    return res.status(201).json(new ChildResponseDTO(child));
  }

  static async delete(req: Request, res: Response) {
    const service = new ChildService();
    const result = await service.delete(Number(req.params.id));
    return res.json(result);
  }
}
