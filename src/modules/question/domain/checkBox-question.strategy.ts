import { BadRequestException } from '@nestjs/common';
import {
  CreateQuestionRequestDto,
  CreateSelectOptionRequestDto,
} from '../dto/create-question.dto';
import { PartQuestionRepository } from '../repositories/parts-questions.repository';
import { QuestionRepository } from '../repositories/question.repository';
import { SelectOptionsRepository } from '../repositories/select-options.repository';
import { QuestionStrategy } from './question.strategy';

export class CheckBoxQuestion implements QuestionStrategy {
  private partIds: number[];
  private selectOptions: CreateSelectOptionRequestDto[];
  private data: {
    type: 'CHOICE' | 'SHORT' | 'LONG' | 'CHECKBOX';
    text: string;
    questionNumber: number;
    generationId: number;
    required: boolean;
  };
  constructor({ partIds, selectOptions, ...data }: CreateQuestionRequestDto) {
    this.partIds = partIds;
    this.selectOptions = selectOptions;
    this.data = data;
    this.validate();
  }

  private validate(): void {
    if (this.selectOptions?.length == 0) {
      throw new BadRequestException('빈 데이터');
    }
  }

  async saveQuestion(
    questionRepository: QuestionRepository,
    partQuestionRepository: PartQuestionRepository,
    selectOptionsRepository: SelectOptionsRepository,
  ): Promise<number> {
    const question = await questionRepository.save(this.data);
    await Promise.all(
      this.selectOptions.map(async (selectOption) => {
        await selectOptionsRepository.save({
          ...selectOption,
          questionId: question.id,
        });
      }),
    );
    await Promise.all(
      this.partIds.map(async (partId) => {
        await partQuestionRepository.save({
          partId,
          questionId: question.id,
        });
      }),
    );
    return question.id;
  }
}
