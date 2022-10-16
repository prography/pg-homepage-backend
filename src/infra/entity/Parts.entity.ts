import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Parts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  frameworks: string;
}
