import { IsNumber, IsString } from 'class-validator';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Generations } from './Generations.entity';
import { Questions } from './Questions.entity';

@Entity()
export class Parts {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column()
  name: string;

  @IsNumber()
  @Column()
  generationId: number;

  @ManyToOne((type) => Generations, (generation) => generation.parts)
  generation: Generations;

  @ManyToMany((type) => Questions, (question) => question.parts)
  @JoinTable()
  questions: Questions[];
}
