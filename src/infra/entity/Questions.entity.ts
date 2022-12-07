import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';
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
  CHOICE: 'CHOICE',
  SHORT: 'SHORT',
  LONG: 'LONG',
  CHECKBOX: 'CHECKBOX',
} as const;

type QuestionType = typeof Question[keyof typeof Question];

@Entity()
export class Questions {
  @PrimaryGeneratedColumn()
  id: number;

  @IsEnum(Question)
  @ApiProperty({ enum: Object.keys(Question) })
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

  @Column()
  @IsBoolean()
  required: boolean;

  @OneToMany(() => SelectOptions, (selectOption) => selectOption.question)
  selectOptions: SelectOptions[];

  @ApiHideProperty()
  @OneToMany(() => Answers, (answer) => answer.question)
  answers: Answers[];

  @ApiHideProperty()
  @ManyToOne(() => Generations, (generation) => generation.questions)
  generation: Generations[];

  @ApiHideProperty()
  @OneToMany(() => PartsQuestions, (partsQuestions) => partsQuestions.question)
  partsQuestions: PartsQuestions[];
}
