import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Portfolios {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUrl: string;

  @Column()
  teamName: string;
}
