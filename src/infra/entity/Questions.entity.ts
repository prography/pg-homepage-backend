import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Answers } from './Answers.entity';
import { Generations } from './Generations.entity';
import { Parts } from './Parts.entity';
import { SelectOptions } from './SelectOptions.entity';

@Entity()
export class Questions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  type: string;

  @Column()
  questionNumber: number;

  @OneToMany((type) => SelectOptions, (selectOption) => selectOption.question)
  selectOptions: SelectOptions[];

  @OneToMany((type) => Answers, (answer) => answer.question)
  answers: Answers[];

  @ManyToOne((type) => Generations, (generation) => generation.questions)
  generation: Generations[];

  @ManyToMany((type) => Parts, (part) => part.questions)
  parts: Parts[];
}
