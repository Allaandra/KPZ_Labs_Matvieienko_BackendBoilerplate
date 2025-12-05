import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Child } from '../orm/entities/users/Child';
import { KindergartenGroup } from '../orm/entities/users/KindergartenGroup';

export class ChildController {
  static async getAll(req: Request, res: Response) {
    const repo = getRepository(Child);
    const children = await repo.find({ relations: ['group'] });
    return res.json(children);
  }

  static async getOne(req: Request, res: Response) {
    const repo = getRepository(Child);
    const child = await repo.findOne(req.params.id, { relations: ['group'] });
    return res.json(child);
  }

  static async create(req: Request, res: Response) {
    try {
      const { first_name, last_name, patronymic, birthday_date, groups_id } = req.body;

      // Проверка входных данных
      if (!first_name || !last_name || !birthday_date || !groups_id) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const childRepo = getRepository(Child);
      const groupRepo = getRepository(KindergartenGroup);

      // Ищем группу
      const group = await groupRepo.findOne(groups_id);
      if (!group) {
        return res.status(404).json({ message: 'Group not found' });
      }

      // Создаём ребёнка
      const child = new Child();
      child.firstName = first_name;
      child.lastName = last_name;
      child.patronymic = patronymic;
      child.birthdayDate = birthday_date;
      child.group = groups_id;

      const saved = await childRepo.save(child);

      return res.json(saved);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'Server error' });
    }
  }

  static async delete(req: Request, res: Response) {
    const repo = getRepository(Child);
    await repo.delete(req.params.id);
    return res.json({ message: 'Deleted' });
  }

  static async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const { first_name, last_name, patronymic, birthday_date, groups_id } = req.body;

      const childRepo = getRepository(Child);
      const groupRepo = getRepository(KindergartenGroup);

      const child = await childRepo.findOne(id);
      if (!child) return res.status(404).json({ message: 'Child not found' });

      if (groups_id) {
        const group = await groupRepo.findOne(groups_id);
        if (!group) return res.status(404).json({ message: 'Group not found' });
        child.group = group;
      }

      if (first_name) child.firstName = first_name;
      if (last_name) child.lastName = last_name;
      if (patronymic !== undefined) child.patronymic = patronymic;
      if (birthday_date) child.birthdayDate = birthday_date;

      const updated = await childRepo.save(child);
      return res.json(updated);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'Server error' });
    }
  }
}
