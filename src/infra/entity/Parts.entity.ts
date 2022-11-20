import { ApiHideProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Applications } from './Applications.entity';
import { Generations } from './Generations.entity';
import { PartsQuestions } from './parts-questions.entity';

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

  @ApiHideProperty()
  @ManyToOne(() => Generations, (generation) => generation.parts)
  generation: Generations;

  @ApiHideProperty()
  @OneToMany(() => PartsQuestions, (partsQuestions) => partsQuestions.part)
  partsQuestions: PartsQuestions[];

  @ApiHideProperty()
  @OneToMany(() => Applications, (applications) => applications.part)
  application: Applications[];
}
