import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Answers } from './Answers.entity';
import { Generations } from './Generations.entity';
import { Parts } from './Parts.entity';
import { Users } from './Users.entity';

@Entity()
export class Applications {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @OneToMany(() => Answers, (answer) => answer.application)
  answers: Answers[];

  @ManyToOne(() => Users, (user) => user.applications)
  user: Users;

  @ManyToOne(() => Generations, (generation) => generation.applications)
  generation: Generations;

  @ManyToOne(() => Parts, (part) => part.application)
  part: Parts;
}
