import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Generations } from './Generations.entity';

@Entity()
export class Portfolios {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUrl: string;

  @Column()
  teamName: string;

  @Column('text', { array: true })
  teamMembers: string[];

  @Column()
  projectName: string;

  @Column()
  projectDescription: string;

  @ManyToOne((type) => Generations, (generation) => generation.portfolios)
  generation: Generations;
}
