import { Injectable } from '@nestjs/common';
import { Applications } from 'src/infra/entity/Applications.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ApplicationRepository extends Repository<Applications> {
  constructor(private readonly dataSource: DataSource) {
    super(Applications, dataSource.createEntityManager());
  }

  async findById(applicationId: number): Promise<Applications> {
    return await this.findOne({
      where: { id: applicationId },
      relations: {
        answers: true,
      },
    });
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
    return await queryBuilder.getMany();
  }
}
