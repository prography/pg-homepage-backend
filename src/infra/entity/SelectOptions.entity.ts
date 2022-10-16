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

  @ManyToOne((type) => Questions, (question) => question.selectOptions)
  question: Questions;
}
