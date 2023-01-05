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
    return await this.answersRepository.save(answers);
  }

  async save(application: Applications) {
    return await this.applicationRepository.save(application);
  }

  async update(application: Applications) {
    return await this.applicationRepository.update(application.id, application);
  }

  async findById(applicationId: number): Promise<Applications> {
    return await this.applicationRepository.findById(applicationId);
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
    return await this.applicationRepository.findWithQuery(
      partId,
      status,
      generationId,
    );
  }
  async deleteAnswersByQuestionId({ questionId }: { questionId: number }) {
    return await this.answersRepository.delete({ questionId: questionId });
  }
}
