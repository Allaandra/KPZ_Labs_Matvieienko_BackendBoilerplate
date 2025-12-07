import { getConnection } from 'typeorm';

import { AppError } from '../errors/AppError';
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
    return await this.childRepository.findOne({
      where: { id },
      relations: ['group'],
    });
  }

  async create(data: any) {
    const { firstName, lastName, patronymic, birthdayDate, groupId } = data;

    // Проверяем существование группы
    const group = await this.groupRepository.findOne({
      where: { id: groupId },
    });

    if (!group) {
      throw new AppError('Group not found', 404);
    }

    // Создаем ребёнка
    const child = this.childRepository.create({
      firstName,
      lastName,
      patronymic,
      birthdayDate,
      group,
    });

    const savedChild = await this.childRepository.save(child);

    group.childCount += 1;
    await this.groupRepository.save(group);

    return savedChild;
  }

  async update(id: number, data: any) {
    const child = await this.findOne(id); // если нет — кинет ошибку

    if (data.firstName !== undefined) child.firstName = data.firstName;
    if (data.lastName !== undefined) child.lastName = data.lastName;
    if (data.patronymic !== undefined) child.patronymic = data.patronymic;
    if (data.birthdayDate !== undefined) child.birthdayDate = data.birthdayDate;

    // Если изменили группу:
    if (data.groupId !== undefined) {
      const oldGroup = child.group;

      const newGroup = await this.groupRepository.findOne({
        where: { id: data.groupId },
      });

      // Переносим в новую группу
      child.group = newGroup;

      // Обновляем счетчики
      if (oldGroup.id !== newGroup.id) {
        oldGroup.childCount -= 1;
        newGroup.childCount += 1;

        await this.groupRepository.save(oldGroup);
        await this.groupRepository.save(newGroup);
      }
    }

    return await this.childRepository.save(child);
  }

  async delete(id: number) {
    const child = await this.findOne(id);

    const group = child.group;

    await this.childRepository.remove(child);

    // Уменьшаем количество детей
    group.childCount -= 1;
    if (group.childCount < 0) group.childCount = 0;

    await this.groupRepository.save(group);

    return { message: 'Child deleted successfully' };
  }
}
