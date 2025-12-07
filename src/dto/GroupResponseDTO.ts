import { KindergartenGroup } from '../orm/entities/users/KindergartenGroup';

export class GroupResponseDTO {
  id: number;
  name: string;
  childCount: number;
  children?: {
    id: number;
    firstName: string;
    lastName: string;
    patronymic?: string;
    birthdayDate: Date;
  }[];

  constructor(group: KindergartenGroup, includeChildren = false) {
    this.id = group.id;
    this.name = group.name;
    this.childCount = group.childCount;

    if (includeChildren) {
      this.children =
        group.children?.map((child) => ({
          id: child.id,
          firstName: child.firstName,
          lastName: child.lastName,
          patronymic: child.patronymic,
          birthdayDate: child.birthdayDate,
        })) || [];
    }
  }
}
