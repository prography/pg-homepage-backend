import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
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

  @OneToMany((type) => Answers, (answer) => answer.application)
  answers: Answers[];

  @ManyToOne((type) => Users, (user) => user.applications)
  user: Users;

  @ManyToOne((type) => Generations, (generation) => generation.applications)
  generation: Generations;

  @OneToOne((type) => Parts, (part) => part.application)
  part: Parts;
}
