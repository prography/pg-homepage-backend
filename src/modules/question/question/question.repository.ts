import { Injectable } from '@nestjs/common';
import { Questions } from 'src/infra/entity/Questions.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class QuestionRepository extends Repository<Questions> {
  constructor(private readonly dataSource: DataSource) {
    super(Questions, dataSource.createEntityManager());
  }
}
