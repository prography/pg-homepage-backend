import { Injectable } from '@nestjs/common';
import { PartsQuestions } from 'src/infra/entity/parts-questions.entity';
import { Questions } from 'src/infra/entity/Questions.entity';
import { SelectOptions } from 'src/infra/entity/SelectOptions.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class QuestionRepository extends Repository<Questions> {
  constructor(private readonly dataSource: DataSource) {
    super(Questions, dataSource.createEntityManager());
  }

  async findAllByPartIds(partIds: number[]) {
    const questions = await this.dataSource
      .getRepository(PartsQuestions)
      .createQueryBuilder('pq')
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
        'q.generationId as generationId',
      ])
      .execute();

    return Promise.all(
      questions.map(async (question) => ({
        ...question,
        selectOptions: await this.dataSource.getRepository(SelectOptions).find({
          where: { questionId: question.id },
          order: { optionNumber: 'ASC' },
        }),
      })),
    );
  }
}
