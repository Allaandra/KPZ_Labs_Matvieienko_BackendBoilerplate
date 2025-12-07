import { getConnection } from 'typeorm';

import { KindergartenGroup } from '../orm/entities/users/KindergartenGroup';

export class GroupService {
  private repo = getConnection().getRepository(KindergartenGroup);

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    return await this.repo.findOne({ where: { id }, relations: ['children'] });
  }

  async create(data: { name: string }) {
    const group = this.repo.create({
      name: data.name,
      childCount: 0,
    });

    return await this.repo.save(group);
  }

  async update(id: number, data: { name: string }) {
    const group = await this.findOne(id);

    group.name = data.name;

    return await this.repo.save(group);
  }

  async delete(id: number) {
    const group = await this.findOne(id);
    await this.repo.remove(group);
  }
}
