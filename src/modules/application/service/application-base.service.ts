import { Injectable } from '@nestjs/common';
import { Answers } from 'src/infra/entity/Answers.entity';
import { Applications } from 'src/infra/entity/Applications.entity';
import { Generations } from 'src/infra/entity/Generations.entity';
import { Parts } from 'src/infra/entity/Parts.entity';
import { Users } from 'src/infra/entity/Users.entity';
import { AnswersRepository } from '../repository/answer.repository';
import { ApplicationRepository } from '../repository/application.repository';

@Injectable()
export class ApplicationBaseService {
  constructor(
    private readonly applicationRepository: ApplicationRepository,
    private readonly answersRepository: AnswersRepository,
  ) {}

  async saveFinalVersion(
    generation: Generations,
    part: Parts,
    user: Users,
  ): Promise<Applications> {
    const application = this.createMinimumApplication(generation, part, user);
    application.status = 'finalSubmit';
    application.finished = true;
    return await this.applicationRepository.save(application);
  }

  async saveAnswers(answers: Answers[]) {
    return await Promise.all(
      answers.map((answer) => {
        this.answersRepository.save(answer);
      }),
    );
  }

  async saveDraftVersion(
    generation: Generations,
    part: Parts,
    user: Users,
  ): Promise<Applications> {
    const application = this.createMinimumApplication(generation, part, user);
    application.status = 'drafts';
    application.finished = false;
    return await this.applicationRepository.save(application);
  }

  createMinimumApplication(
    generation: Generations,
    part: Parts,
    user: Users,
  ): Applications {
    const application = new Applications();
    if (user.applications) {
      application.id = user.applicationIds[user.applicationIds.length - 1];
    }
    application.generation = generation;
    application.part = part;
    application.user = user;
    return application;
  }
}
