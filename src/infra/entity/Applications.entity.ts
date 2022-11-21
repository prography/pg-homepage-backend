import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
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

export const Status = {
  UnEnrolled: 'unenrolled',
  Failed: 'failed',
  Enrolled: 'enrolled',
  DocsQualified: 'docs-qualified',
  AssignmentQualified: 'assignment-qualified',
  FinalQualified: 'final-qualified',
} as const;
export type Status = typeof Status[keyof typeof Status];
@Entity()
export class Applications {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bool' })
  finished: boolean;

  @IsEnum(Status)
  @ApiProperty({ enum: Object.keys(Status) })
  @Column()
  status: Status;

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
