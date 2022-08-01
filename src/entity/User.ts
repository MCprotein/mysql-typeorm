import { Length, Max, Min } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(2, 6)
  username: string;

  @Column()
  email: string;

  @Column()
  @Length(8, 16)
  password: string;

  @Column()
  isActivated: boolean = false;

  @Column()
  role: string = 'user';
}
