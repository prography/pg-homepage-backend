import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Generations {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  applicationStart: Date;

  @Column()
  applicationEnd: Date;

  @Column()
  activityStart: Date;

  @Column()
  activityEnd: Date;

  @Column()
  name: string;
}
