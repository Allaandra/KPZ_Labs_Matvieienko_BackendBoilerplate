import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { KindergartenGroup } from './KindergartenGroup';

@Entity({ name: 'child' })
export class Child {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name', type: 'varchar', length: 100 })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 100 })
  lastName: string;

  @Column({ name: 'patronymic', type: 'varchar', length: 100, nullable: true })
  patronymic?: string;

  @Column({ name: 'birthday_date', type: 'date' })
  birthdayDate: Date;

  // Многие дети → одна группа
  @ManyToOne(() => KindergartenGroup, (group) => group.children, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'groups_id' })
  group?: KindergartenGroup;
}
