import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Parts } from './Parts.entity';
import { Questions } from './Questions.entity';

@Entity('parts_questions')
export class PartsQuestions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  partId: number;

  @Column()
  questionId: number;

  @ManyToOne(() => Parts, (parts) => parts.partsQuestions, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'part_id' })
  part: Parts;

  @ManyToOne(() => Questions, (question) => question.partsQuestions, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'question_id' })
  question: Questions;
}
