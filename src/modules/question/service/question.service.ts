import { Injectable, NotFoundException } from '@nestjs/common';
import { Questions } from 'src/infra/entity/Questions.entity';
import {
  CreateQuestionRequestDto,
  CreateSelectOptionRequestDto,
} from '../dto/create-question.dto';
import { UpdateQuestionRequestDto } from '../dto/update-question.dto';
import { PartQuestionRepository } from '../repositories/parts-questions.repository';
import { QuestionRepository } from '../repositories/question.repository';
import { SelectOptionsRepository } from '../repositories/select-options.repository';

@Injectable()
export class QuestionService {
  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly partQuestionRepository: PartQuestionRepository,
    private readonly selectOptionsRepository: SelectOptionsRepository,
  ) {}

  async getQuestions(partIds: number[]): Promise<Questions[]> {
    return this.questionRepository.findAllByPartIds(partIds);
  }

  async createQuestion({
    partIds,
    selectOptions,
    ...data
  }: CreateQuestionRequestDto): Promise<Questions> {
    const question = await this.questionRepository.save(data);
    await Promise.all(
      selectOptions.map(async (selectOption) => {
        await this.selectOptionsRepository.save({
          ...selectOption,
          questionId: question.id,
        });
      }),
    );
    await Promise.all(
      partIds.map(async (partId) => {
        await this.partQuestionRepository.save({
          partId,
          questionId: question.id,
        });
      }),
    );
    return this.getQuestion(question.id);
  }

  private async getQuestion(id: number) {
    const question = await this.questionRepository.findOne({
      where: { id },
      relations: { selectOptions: true },
    });
    if (!question) {
      throw new NotFoundException();
    }
    return question;
  }

  async updateQuestion(
    id: number,
    { partIds, selectOptions, ...data }: UpdateQuestionRequestDto,
  ): Promise<Questions> {
    const question = await this.getQuestion(id);
    selectOptions &&
      (await this.updateSelectOptions(question.id, selectOptions));
    partIds && (await this.updatePartQuestion(question.id, partIds));
    await this.questionRepository.update(id, data);
    return this.getQuestion(question.id);
  }

  async deleteQuestion(id: number) {
    await this.questionRepository.delete(id);
    return { success: true };
  }

  private async updateSelectOptions(
    questionId: number,
    selectOptions: CreateSelectOptionRequestDto[],
  ) {
    await this.selectOptionsRepository.delete({ questionId });
    await Promise.all(
      selectOptions.map(async (selectOption) => {
        await this.selectOptionsRepository.save({
          questionId,
          ...selectOption,
        });
      }),
    );
  }

  private async updatePartQuestion(questionId: number, partIds: number[]) {
    await this.partQuestionRepository.delete({ questionId });
    await Promise.all(
      partIds.map(async (partId) => {
        await this.partQuestionRepository.save({
          questionId,
          partId,
        });
      }),
    );
  }
}