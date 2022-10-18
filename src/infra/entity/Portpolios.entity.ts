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
  //member는 json형태로 저장되고, 불러와야 함. JSON.stringify(string[]) 의 형태
  teamMembers: string;

  @Column()
  projectName: string;

  @Column('text')
  projectDescription: string;

  @ManyToOne((type) => Generations, (generation) => generation.portfolios)
  generation: Generations;
}
