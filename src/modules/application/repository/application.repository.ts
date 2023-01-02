import { Injectable } from '@nestjs/common';
import { Applications } from 'src/infra/entity/Applications.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ApplicationRepository extends Repository<Applications> {
  constructor(private readonly dataSource: DataSource) {
    super(Applications, dataSource.createEntityManager());
  }

  async findById(applicationId: number): Promise<Applications> {
    const queryBuilder = this.createQueryBuilder('application');
    queryBuilder.where('application.id = :id', { id: applicationId });
    queryBuilder.leftJoinAndSelect('application.answers', 'answers');
    queryBuilder.leftJoinAndSelect('answers.question', 'question');
    queryBuilder.leftJoinAndSelect('question.selectOptions', 'selectOptions');
    queryBuilder.innerJoinAndSelect('application.user', 'user');
    queryBuilder.innerJoinAndSelect('application.part', 'part');

    return queryBuilder.getOne();
  }

  async findWithQuery(
    partId?: string,
    status?: string,
    generationId?: string,
  ): Promise<Applications[]> {
    const queryBuilder = this.createQueryBuilder('application');
    if (partId) {
      queryBuilder.where('application.part = :partId', { partId });
    }
    if (status) {
      queryBuilder.andWhere('application.status = :status', { status });
    }
    if (generationId) {
      queryBuilder.andWhere('application.generation = :generationId', {
        generationId,
      });
    }
    queryBuilder.leftJoinAndSelect('application.answers', 'answers');
    queryBuilder.leftJoinAndSelect('answers.question', 'question');
    queryBuilder.leftJoinAndSelect('question.selectOptions', 'selectOptions');
    queryBuilder.innerJoinAndSelect('application.user', 'user');
    queryBuilder.innerJoinAndSelect('application.part', 'part');
    return await queryBuilder.getMany();
  }
}
