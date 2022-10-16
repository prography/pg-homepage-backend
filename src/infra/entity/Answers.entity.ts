import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Applications } from './Applications.entity';
import { Questions } from './Questions.entity';

@Entity()
export class Answers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @ManyToOne((type) => Applications, (application) => application.answers)
  application: Applications;

  @ManyToOne((type) => Questions, (question) => question.answers)
  question: Questions;
}
