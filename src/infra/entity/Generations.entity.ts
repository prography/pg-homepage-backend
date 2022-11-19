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

  @OneToMany(() => Portfolios, (portfolio) => portfolio.generation)
  portfolios: Portfolios[];

  @OneToMany(() => Parts, (part) => part.generation)
  parts: Parts[];

  @OneToMany(() => Questions, (question) => question.generation)
  questions: Questions[];

  @OneToMany(() => Applications, (application) => application.generation)
  applications: Applications[];
}
