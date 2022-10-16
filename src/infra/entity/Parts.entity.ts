import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Applications } from './Applications.entity';
import { Generations } from './Generations.entity';
import { Questions } from './Questions.entity';

@Entity()
export class Parts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  frameworks: string;

  @ManyToOne((type) => Generations, (generation) => generation.parts)
  generation: Generations;

  @OneToOne((type) => Applications, (application) => application.part)
  @JoinColumn()
  application: Applications;

  @ManyToMany((type) => Questions, (question) => question.parts)
  @JoinTable()
  questions: Questions[];
}
