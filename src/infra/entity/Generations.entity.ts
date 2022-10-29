import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Applications } from './Applications.entity';
import { Parts } from './Parts.entity';
import { Portfolios } from './Portpolios.entity';
import { Questions } from './Questions.entity';

@Entity()
export class Generations {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  applicationStart: Date;

  @Column({ type: 'date' })
  applicationEnd: Date;

  @Column({ type: 'date' })
  activityStart: Date;

  @Column({ type: 'date' })
  activityEnd: Date;

  @Column()
  name: string;

  @OneToMany((type) => Portfolios, (portfolio) => portfolio.generation)
  portfolios: Portfolios[];

  @OneToMany((type) => Parts, (part) => part.generation)
  parts: Parts[];

  @OneToMany((type) => Questions, (question) => question.generation)
  questions: Questions[];

  @OneToMany((type) => Applications, (application) => application.generation)
  applications: Applications[];
}
