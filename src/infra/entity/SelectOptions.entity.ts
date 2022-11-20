import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Questions } from './Questions.entity';

@Entity()
export class SelectOptions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @Column()
  optionNumber: number;

  @Column()
  questionId: number;

  @ManyToOne(() => Questions, (question) => question.selectOptions, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  question: Questions;
}
