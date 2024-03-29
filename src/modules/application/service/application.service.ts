import { TokenType } from '@modules/auth/role/rolesType';
import { CommonService } from '@modules/common/common.service';
import { GenerationGetCurrentResponseDto } from '@modules/generation/dto/reponse-generation.dto';
import { GenerationService } from '@modules/generation/service/generation.service';
import { PartBaseService } from '@modules/part/service/part-base.service';
import { UserBaseService } from '@modules/user/service/user-base.service';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Answers } from 'src/infra/entity/Answers.entity';
import { Applications, Status } from 'src/infra/entity/Applications.entity';
import { Generations } from 'src/infra/entity/Generations.entity';
import { Parts } from 'src/infra/entity/Parts.entity';
import { Users } from 'src/infra/entity/Users.entity';
import {
  AnswerCreateDto,
  ApplicationCreateDto,
} from '../dto/create-application.dto';
import { ApplicationBaseService } from './application-base.service';

@Injectable()
export class ApplicationService {
  constructor(
    private readonly userBaseService: UserBaseService,
    private readonly generationService: GenerationService,
    private readonly applicationBaseService: ApplicationBaseService,
    private readonly partBaseService: PartBaseService,
    private readonly commonService: CommonService,
  ) {}

  async createFinalApplication(
    userToken: TokenType,
    applicationCreateDto: ApplicationCreateDto,
  ): Promise<Applications> {
    const [user, generation, part] = await Promise.all([
      this.userBaseService.findUserAndApplicationsOrThrow(userToken.userId),
      this.generationService.findOneGenerationByCurrentDate(),
      this.partBaseService.fromPartIdToSelectOptionsOrThrow(
        applicationCreateDto.partId,
      ),
    ]);
    this.validateGeneration(applicationCreateDto, generation);

    return await this.commonService.transaction<Applications>(async () => {
      const application = await this.saveFinalVersion(generation, part, user);
      const answers: Answers[] = this.createAnswers(
        applicationCreateDto,
        part,
        application,
      );
      await this.applicationBaseService.saveAnswers(answers);
      return application;
    });
  }

  private validateGeneration(
    applicationCreateDto: ApplicationCreateDto,
    generation: GenerationGetCurrentResponseDto,
  ): void {
    if (applicationCreateDto.generationId != generation.id) {
      throw new NotFoundException('잘못된 기수정보 입니다');
    }
    if (!generation.isApplying) {
      throw new NotFoundException('지원 기간이 지났습니다');
    }
  }
  private async saveFinalVersion(
    generation: Generations,
    part: Parts,
    user: Users,
  ): Promise<Applications> {
    const application = this.createMinimumApplication(generation, part, user);
    application.status = Status.Enrolled;
    return await this.applicationBaseService.save(application);
  }

  private createAnswers(
    applicationCreateDto: ApplicationCreateDto,
    part: Parts,
    application: Applications,
  ): Answers[] {
    const questions = part.partsQuestions.map(
      (partQuestion) => partQuestion.question,
    );

    const answers: Answers[] = applicationCreateDto.answers.map(
      (answerCreateDto: AnswerCreateDto) => {
        const oneQuestion = questions.filter(
          (question) => question.id == answerCreateDto.questionId,
        )[0];

        if (oneQuestion == undefined) {
          throw new BadRequestException('질문 답변쌍이 잘못된 값입니다');
        }

        const answer = new Answers();
        answer.question = oneQuestion;
        answer.value = answerCreateDto.answer;
        answer.application = application;
        return answer;
      },
    );
    return answers;
  }

  private createMinimumApplication(
    generation: Generations,
    part: Parts,
    user: Users,
  ): Applications {
    const application = new Applications();
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
      this.userBaseService.findUserAndApplicationsOrThrow(userToken.userId),
      this.generationService.findOneGenerationByCurrentDate(),
      this.partBaseService.fromPartIdToSelectOptionsOrThrow(
        applicationCreateDto.partId,
      ),
    ]);
    this.validateGeneration(applicationCreateDto, generation);

    return await this.commonService.transaction<Applications>(async () => {
      const application = await this.saveDraftVersion(generation, part, user);
      const answers: Answers[] = this.createAnswers(
        applicationCreateDto,
        part,
        application,
      );
      await this.applicationBaseService.saveAnswers(answers);
      return application;
    });
  }

  private async saveDraftVersion(
    generation: Generations,
    part: Parts,
    user: Users,
  ): Promise<Applications> {
    const application = this.createMinimumApplication(generation, part, user);
    application.status = Status.UnEnrolled;
    const alreadyExistApplication = user.applications
      .filter((application) => application.status == Status.UnEnrolled)
      .filter((application) => application.part.id === part.id)[0];
    if (alreadyExistApplication) {
      application.id = alreadyExistApplication.id;
      await this.applicationBaseService.deleteById(alreadyExistApplication.id);
    }
    return await this.applicationBaseService.save(application);
  }

  async findOneApplication(userToken: TokenType, applicationId: number) {
    const application = await this.applicationBaseService.findById(
      applicationId,
    );
    if (application === null) {
      throw new BadRequestException('존재하지 않는 id 입니다');
    }
    if (application.user.id != userToken.userId) {
      throw new ForbiddenException('권한이 없습니다');
    }
    return application;
  }
}
