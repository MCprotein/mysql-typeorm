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
  password: string;

  //   @Column({ default: true })
  //   isActivated: boolean = false;

  //   @Column({ default: true })
  //   role: string = 'user';
}
