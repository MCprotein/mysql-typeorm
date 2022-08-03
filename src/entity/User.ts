import { Length } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Todo } from './Todo';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  @Length(2, 6)
  username: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  @Length(8, 16)
  password: string;

  @Column({ type: 'boolean', nullable: false })
  isActivated: boolean = false;

  @Column({ type: 'varchar', nullable: false })
  role: string = 'user';

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
