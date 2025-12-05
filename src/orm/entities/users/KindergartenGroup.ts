import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Child } from './Child';

@Entity({ name: 'kindergarten_group' })
export class KindergartenGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @Column({ name: 'child_count', type: 'int', default: 0 })
  childCount: number;

  // Один класс / группа → много детей
  @OneToMany(() => Child, (child) => child.group)
  children: Child[];
}
