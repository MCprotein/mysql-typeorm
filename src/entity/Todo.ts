import { Length } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  @Length(1, 100)
  title: string;

  @Length(1, 5000)
  @Column({ type: 'varchar', nullable: false })
  content: string;
}
