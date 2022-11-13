import { Injectable } from '@nestjs/common';
import { SelectOptions } from 'src/infra/entity/SelectOptions.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class SelectOptionsRepository extends Repository<SelectOptions> {
  constructor(private readonly dataSource: DataSource) {
    super(SelectOptions, dataSource.createEntityManager());
  }
}
