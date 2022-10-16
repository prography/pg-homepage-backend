import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Applications {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;
}
