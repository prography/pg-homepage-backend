import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Answers } from './Answers.entity';
import { Generations } from './Generations.entity';
import { PartsQuestions } from './parts-questions.entity';
import { SelectOptions } from './SelectOptions.entity';

const Question = {
  CHOICE: '객관식',
  ESSAY: '주관식',
} as const;

type QuestionType = typeof Question[keyof typeof Question];

@Entity()
export class Questions {
  @PrimaryGeneratedColumn()
  id: number;

  @IsEnum(Question)
  @Column()
  type: QuestionType;

  @IsString()
  @ApiProperty({ description: '질문 내용' })
  @Column()
  text: string;

  @IsNumber()
  @ApiProperty({ description: '질문 번호 - 해당 질문의 보여줄 순서 지정' })
  @Column()
  questionNumber: number;

  @IsNumber()
  @Column()
  generationId: number;

  @OneToMany((type) => SelectOptions, (selectOption) => selectOption.question)
  selectOptions: SelectOptions[];

  @OneToMany((type) => Answers, (answer) => answer.question)
  answers: Answers[];

  @ManyToOne((type) => Generations, (generation) => generation.questions)
  generation: Generations[];

  @OneToMany(() => PartsQuestions, (partsQuestions) => partsQuestions.question)
  partsQuestions: PartsQuestions[];
}
