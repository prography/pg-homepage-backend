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
import { ApplicationCreateDto } from '../dto/create-application.dto';
import { ApplicationUpdateDto } from '../dto/update-application.dto';
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
      return await this.saveAnswer(
        user,
        part,
        generation,
        applicationCreateDto,
        this.saveFinalVersion.bind(this),
      );
    });
  }
  private validateGeneration(
    applicationCreateDto: ApplicationCreateDto,
    generation: GenerationGetCurrentResponseDto,
  ): void {
    if (applicationCreateDto.generationId != generation.id) {
      throw new NotFoundException('잘못된 기수정보 입니다');
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
  ): Promise<any> {
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
  }

  private createMinimumApplication(
    generation: Generations,
    part: Parts,
    user: Users,
  ): Applications {
    const application = new Applications();
    // if (user.applications) {
    //   application.id = user.applicationIds[user.applicationIds.length - 1];
    // }
    application.generation = generation;
    application.part = part;
    application.user = user;
    return application;
  }

  async createDraftApplication(
    userToken: TokenType,
    applicationCreateDto: ApplicationCreateDto,
  ): Promise<ApplicationUpdateDto> {
    const [user, generation, part] = await Promise.all([
      this.userBaseService.findUserAndApplicationsOrThrow(userToken.userId),
      this.generationService.findOneGenerationByCurrentDate(),
      this.partBaseService.fromPartIdToSelectOptionsOrThrow(
        applicationCreateDto.partId,
      ),
    ]);
    this.validateGeneration(applicationCreateDto, generation);

    return await this.commonService.transaction<ApplicationUpdateDto>(
      async () => {
        return await this.saveAnswer(
          user,
          part,
          generation,
          applicationCreateDto,
          this.saveDraftVersion.bind(this),
        );
      },
    );
  }

  private async saveDraftVersion(
    generation: Generations,
    part: Parts,
    user: Users,
  ): Promise<Applications> {
    const application = this.createMinimumApplication(generation, part, user);
    application.status = Status.UnEnrolled;
    const alreadyExistApplication = user.applications.filter(
      (application) => application.status == Status.UnEnrolled,
    )[0];
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
    if (application.user.id != userToken.userId) {
      throw new ForbiddenException('권한이 없습니다');
    }
    return application;
  }
}
