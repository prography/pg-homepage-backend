import { ApiHideProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Answers } from './Answers.entity';
import { Generations } from './Generations.entity';
import { Parts } from './Parts.entity';
import { Users } from './Users.entity';

@Entity()
export class Applications {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bool' })
  finished: boolean;

  @Column()
  status: string;

  @OneToMany(() => Answers, (answer) => answer.application)
  answers: Answers[];

  @ManyToOne(() => Users, (user) => user.applications)
  user: Users;

  @ApiHideProperty()
  @ManyToOne(() => Generations, (generation) => generation.applications)
  generation: Generations;

  @RelationId((applications: Applications) => applications.generation)
  generationId: number;

  @ManyToOne(() => Parts, (part) => part.application)
  part: Parts;

  @RelationId((application: Applications) => application.answers)
  answerIds: number[];
}
