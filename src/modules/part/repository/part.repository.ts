import { Injectable } from '@nestjs/common';
import { Parts } from 'src/infra/entity/Parts.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PartRepository extends Repository<Parts> {
  constructor(private readonly dataSource: DataSource) {
    super(Parts, dataSource.createEntityManager());
  }
}
