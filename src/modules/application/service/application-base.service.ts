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
    return await this.applicationRepository.delete(applicationId);
  }

  async updateAll(applicationId: number, application: Partial<Applications>) {
    return await this.applicationRepository.update(applicationId, application);
  }
}
