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

  @Column()
  //JSON.stringify(string[]) 의 형태
  teamMembers: string;

  @Column()
  projectName: string;

  @Column('text')
  projectDescription: string;

  @Column()
  //JSON.stringify(string[]) 의 형태
  frameworks: string;

  @ManyToOne((type) => Generations, (generation) => generation.portfolios)
  generation: Generations;
}
