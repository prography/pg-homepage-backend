import { Injectable } from '@nestjs/common';
import { PartsQuestions } from 'src/infra/entity/parts-questions.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PartQuestionRepository extends Repository<PartsQuestions> {
  constructor(private readonly dataSource: DataSource) {
    super(PartsQuestions, dataSource.createEntityManager());
  }

  async findAllByPartIds(partIds: number[]) {
    return this.createQueryBuilder('pq')
      .leftJoin('pq.question', 'q')
      .where('pq.partId in(:...partIds)', {
        partIds: Array.isArray(partIds) ? partIds : [partIds],
      })
      .orderBy('q.questionNumber', 'ASC')
      .select([
        'q.id as id',
        'q.type as type',
        'q.text as text',
        'q.questionNumber as questionNumber',
      ])
      .execute();
  }
}
