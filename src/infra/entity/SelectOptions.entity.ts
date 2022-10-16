import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SelectOptions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @Column()
  optionNumber: number;
}
