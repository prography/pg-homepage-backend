import { Injectable } from '@nestjs/common';
import { Generations } from 'src/infra/entity/Generations.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class GenerationRepository extends Repository<Generations> {
  constructor(private dataSource: DataSource) {
    super(Generations, dataSource.createEntityManager());
  }
}
