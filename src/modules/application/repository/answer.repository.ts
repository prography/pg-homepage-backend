import { Injectable } from '@nestjs/common';
import { Answers } from 'src/infra/entity/Answers.entity';
import { DataSource, In, Repository } from 'typeorm';

@Injectable()
export class AnswersRepository extends Repository<Answers> {
  constructor(private readonly dataSource: DataSource) {
    super(Answers, dataSource.createEntityManager());
  }

  async deleteByIds(answerIds: number[]) {
    await this.delete({
      id: In(answerIds),
    });
  }
}
