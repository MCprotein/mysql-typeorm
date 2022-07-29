import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password1: string;

  @Column()
  password2: string;

  @Column()
  isActivated: boolean;

  @Column()
  role: string;
}
