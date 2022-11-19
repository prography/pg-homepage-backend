import { Injectable } from '@nestjs/common';
import { Applications } from 'src/infra/entity/Applications.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ApplicationRepository extends Repository<Applications> {
  constructor(private readonly dataSource: DataSource) {
    super(Applications, dataSource.createEntityManager());
  }
}
