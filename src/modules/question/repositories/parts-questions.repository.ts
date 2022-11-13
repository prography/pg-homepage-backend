import { Injectable } from '@nestjs/common';
import { PartsQuestions } from 'src/infra/entity/parts-questions.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PartQuestionRepository extends Repository<PartsQuestions> {
  constructor(private readonly dataSource: DataSource) {
    super(PartsQuestions, dataSource.createEntityManager());
  }
}
