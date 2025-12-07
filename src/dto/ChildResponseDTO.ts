import { Child } from '../orm/entities/users/Child';

export class ChildResponseDTO {
  id: number;
  firstName: string;
  lastName: string;
  patronymic?: string;
  birthdayDate: Date;
  group: {
    id: number;
    name: string;
    //childCount: number;
  };

  constructor(child: Child) {
    this.id = child.id;
    this.firstName = child.firstName;
    this.lastName = child.lastName;
    this.patronymic = child.patronymic;
    this.birthdayDate = child.birthdayDate;

    this.group = {
      id: child.group.id,
      name: child.group.name,
      //childCount: child.group.childCount,
    };
  }
}
