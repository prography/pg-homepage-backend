import { TokenType } from '@modules/auth/role/rolesType';
import { GenerationGetCurrentResponseDto } from '@modules/generation/dto/reponse-generation.dto';
import { GenerationService } from '@modules/generation/service/generation.service';
import { PartBaseService } from '@modules/part/service/part-base.service';
import { UserBaseService } from '@modules/user/service/user-base.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Answers } from 'src/infra/entity/Answers.entity';
import { Applications, Status } from 'src/infra/entity/Applications.entity';
import { Generations } from 'src/infra/entity/Generations.entity';
import { Parts } from 'src/infra/entity/Parts.entity';
import { Users } from 'src/infra/entity/Users.entity';
import { DataSource } from 'typeorm';
import { ApplicationCreateDto } from '../dto/create-application.dto';
import { ApplicationBaseService } from './application-base.service';

@Injectable()
export class ApplicationService {
  constructor(
    private readonly userBaseService: UserBaseService,
    private readonly generationService: GenerationService,
    private readonly applicationBaseService: ApplicationBaseService,
    private readonly partBaseService: PartBaseService,
    private readonly dataSource: DataSource,
  ) {}

  async createFinalApplication(
    userToken: TokenType,
    applicationCreateDto: ApplicationCreateDto,
  ): Promise<Applications> {
    const [user, generation, part] = await Promise.all([
      this.userBaseService.findOrThrows(userToken.userId),
      this.generationService.findOneGenerationByCurrentDate(),
      this.partBaseService.fromPartIdToSelectOptionsOrThrow(
        applicationCreateDto.partId,
      ),
    ]);
    this.validateGeneration(applicationCreateDto, generation);
    return await this.saveAnswer(
      user,
      part,
      generation,
      applicationCreateDto,
      this.saveFinalVersion.bind(this),
    );
  }
  private validateGeneration(
    applicationCreateDto: ApplicationCreateDto,
    generation: GenerationGetCurrentResponseDto,
  ): void {
    if (applicationCreateDto.generationId != generation.id) {
      throw new NotFoundException('잘못된 기수정보 입니다');
    }
  }
  async saveFinalVersion(
    generation: Generations,
    part: Parts,
    user: Users,
  ): Promise<Applications> {
    const application = this.createMinimumApplication(generation, part, user);
    application.status = Status.Enrolled;
    return await this.applicationBaseService.save(application);
  }

  private async saveAnswer(
    user: Users,
    part: Parts,
    generation: Generations,
    applicationCreateDto: ApplicationCreateDto,
    saveTo: (
      generation: Generations,
      part: Parts,
      user: Users,
    ) => Promise<Applications>,
  ): Promise<Applications> {
    return await this.saveTransaction<Applications>(async () => {
      const questions = part.partsQuestions.map(
        (partQuestion) => partQuestion.question,
      );
      const application = await saveTo(generation, part, user);
      const answers: Answers[] = applicationCreateDto.answers.map((answer) => {
        const oneQuestion = questions.filter(
          (question) => question.id == answer.questionId,
        )[0];
        if (oneQuestion == undefined) {
          throw new BadRequestException('질문 답변쌍이 잘못된 값입니다');
        }
        const temp = new Answers();
        temp.question = oneQuestion;
        temp.value = answer.answer;
        temp.application = application;
        return temp;
      });
      await this.applicationBaseService.saveAnswers(answers);
      return application;
    });
  }

  private async saveTransaction<T>(executable: () => Promise<T>): Promise<T> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = executable();
      await queryRunner.commitTransaction();
      return result;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(err.message);
    } finally {
      await queryRunner.release();
    }
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

  async createDraftApplication(
    userToken: TokenType,
    applicationCreateDto: ApplicationCreateDto,
  ): Promise<Applications> {
    const [user, generation, part] = await Promise.all([
      this.userBaseService.findOrThrows(userToken.userId),
      this.generationService.findOneGenerationByCurrentDate(),
      this.partBaseService.fromPartIdToSelectOptionsOrThrow(
        applicationCreateDto.partId,
      ),
    ]);
    this.validateGeneration(applicationCreateDto, generation);
    return await this.saveAnswer(
      user,
      part,
      generation,
      applicationCreateDto,
      this.applicationBaseService.saveDraftVersion.bind(this),
    );
  }
}
