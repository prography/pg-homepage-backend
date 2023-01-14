import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Applications } from './Applications.entity';
import { Questions } from './Questions.entity';

@Entity()
export class Answers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'longtext' })
  value: string;

  @Column()
  questionId: number;

  @ManyToOne(() => Applications, (application) => application.answers)
  application: Applications;

  @ManyToOne(() => Questions, (question) => question.answers)
  question: Questions;
}
