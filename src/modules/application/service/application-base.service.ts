import { Injectable } from '@nestjs/common';
import { Answers } from 'src/infra/entity/Answers.entity';
import { Applications } from 'src/infra/entity/Applications.entity';
import { Generations } from 'src/infra/entity/Generations.entity';
import { Parts } from 'src/infra/entity/Parts.entity';
import { Users } from 'src/infra/entity/Users.entity';
import { ApplicationCreateDto } from '../dto/create-application.dto';
import { AnswersRepository } from '../repository/answer.repository';
import { ApplicationRepository } from '../repository/application.repository';

@Injectable()
export class ApplicationBaseService {
  constructor(
    private readonly applicationRepository: ApplicationRepository,
    private readonly answersRepository: AnswersRepository,
  ) {}

  create(applicationCreateDto: ApplicationCreateDto): Applications {
    const application = new Applications();
    // application.answers = applicationCreateDto.answers;

    return application;
  }

  async saveFinalVersion(
    generation: Generations,
    part: Parts,
    user: Users,
  ): Promise<Applications> {
    const applications = new Applications();
    applications.finished = true;
    applications.generation = generation;
    applications.part = part;
    applications.status = '최종지원';
    applications.user = user;
    return await this.applicationRepository.save(applications);
  }

  async saveAnswers(answers: Answers[]) {
    return await Promise.all(
      answers.map((answer) => {
        this.answersRepository.save(answer);
      }),
    );
  }
}
