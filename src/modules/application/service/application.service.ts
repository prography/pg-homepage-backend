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
import { Applications } from 'src/infra/entity/Applications.entity';
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
    user: TokenType,
    applicationCreateDto: ApplicationCreateDto,
  ): Promise<Applications> {
    const [userData, generation] = await Promise.all([
      this.userBaseService.findOrThrows(user.userId),
      this.generationService.findOneGenerationByCurrentDate(),
    ]);
    this.validateGeneration(applicationCreateDto, generation);
    const part: Parts = await this.partBaseService.fromPartIdToSelectOptions(1);
    const questions = part.partsQuestions.map(
      (partQuestion) => partQuestion.question,
    );
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const application = await this.applicationBaseService.saveFinalVersion(
        generation,
        part,
        userData,
      );
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
      await queryRunner.commitTransaction();
      return application;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(err.message);
    } finally {
      await queryRunner.release();
    }
  }

  private validateGeneration(
    applicationCreateDto: ApplicationCreateDto,
    generation: GenerationGetCurrentResponseDto,
  ): void {
    if (applicationCreateDto.generationId != generation.id) {
      throw new NotFoundException('잘못된 기수정보 입니다');
    }
  }
}
