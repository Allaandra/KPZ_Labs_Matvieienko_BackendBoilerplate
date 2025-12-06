import { getConnection } from 'typeorm';

import { Child } from '../orm/entities/users/Child';
import { KindergartenGroup } from '../orm/entities/users/KindergartenGroup';

export class ChildService {
  private childRepository = getConnection().getRepository(Child);
  private groupRepository = getConnection().getRepository(KindergartenGroup);

  async findAll() {
    return await this.childRepository.find({
      relations: ['group'],
    });
  }

  async findOne(id: number) {
    const child = await this.childRepository.findOne({
      where: { id },
      relations: ['group'],
    });

    if (!child) throw new Error('Child not found');

    return child;
  }

  async create(data: any) {
    const group = await this.groupRepository.findOne({ where: { id: data.groupId } });
    if (!group) throw new Error('Group not found');

    const child = this.childRepository.create({
      firstName: data.firstName,
      lastName: data.lastName,
      patronymic: data.patronymic,
      birthdayDate: data.birthdayDate,
      group,
    });

    await this.childRepository.save(child);

    group.childCount++;
    await this.groupRepository.save(group);

    return child;
  }

  async delete(id: number) {
    const child = await this.findOne(id);
    await this.childRepository.remove(child);
    return { message: 'Child deleted' };
  }
}
