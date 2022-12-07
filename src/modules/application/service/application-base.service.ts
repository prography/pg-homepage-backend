import { Injectable } from '@nestjs/common';
import { Answers } from 'src/infra/entity/Answers.entity';
import { Applications } from 'src/infra/entity/Applications.entity';
import { AnswersRepository } from '../repository/answer.repository';
import { ApplicationRepository } from '../repository/application.repository';

@Injectable()
export class ApplicationBaseService {
  constructor(
    private readonly applicationRepository: ApplicationRepository,
    private readonly answersRepository: AnswersRepository,
  ) {}

  async saveAnswers(answers: Answers[]) {
    return await Promise.all(
      answers.map((answer) => {
        this.answersRepository.save(answer);
      }),
    );
  }

  async save(application: Applications) {
    return await this.applicationRepository.save(application);
  }

  async update(application: Applications) {
    return await this.applicationRepository.update(application.id, application);
  }

  async findById(applicationId: number): Promise<Applications> {
    return await this.applicationRepository.findOne({
      where: { id: applicationId },
      relations: {
        answers: true,
      },
    });
  }

  async deleteById(applicationId: number): Promise<{ affected?: number }> {
    const application = await this.applicationRepository.findOne({
      where: {
        id: applicationId,
      },
      relations: {
        answers: true,
      },
    });
    await Promise.all(
      application.answers.map(async (answer) => {
        await this.answersRepository.delete(answer.id);
      }),
    );
    return await this.applicationRepository.delete(applicationId);
  }

  async updateAll(applicationId: number, application: Partial<Applications>) {
    return await this.applicationRepository.update(applicationId, application);
  }

  async findWithQuery(
    partId?: string,
    status?: string,
    generationId?: string,
  ): Promise<Applications[]> {
    const queryBuilder =
      this.applicationRepository.createQueryBuilder('application');
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
