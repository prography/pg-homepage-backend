import { Injectable } from '@nestjs/common';
import { Answers } from 'src/infra/entity/Answers.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AnswersRepository extends Repository<Answers> {
  constructor(private readonly dataSource: DataSource) {
    super(Answers, dataSource.createEntityManager());
  }
}
