import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionRequestDto } from '../dto/create-question.dto';
import { UpdateQuestionRequestDto } from '../dto/update-question.dto';
import { PartQuestionRepository } from '../question/parts-questions.repository';
import { QuestionRepository } from '../question/question.repository';

@Injectable()
export class QuestionService {
  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly partQuestionRepository: PartQuestionRepository,
  ) {}

  async getQuestions(partIds: number[]) {
    return this.partQuestionRepository.findAllByPartIds(partIds);
  }

  async createQuestion({ partIds, ...data }: CreateQuestionRequestDto) {
    const question = await this.questionRepository.save(data);
    await Promise.all(
      partIds.map(async (partId) => {
        await this.partQuestionRepository.save({
          partId,
          questionId: question.id,
        });
      }),
    );
    return question;
  }

  private async getQuestion(id: number) {
    const question = await this.questionRepository.findOneBy({ id });
    if (!question) {
      throw new NotFoundException();
    }
    return question;
  }

  async updateQuestion(
    id: number,
    { partIds, ...data }: UpdateQuestionRequestDto,
  ) {
    const question = await this.getQuestion(id);
    if (partIds) {
      await this.savePartQuestion(partIds, question.id);
    }
    await this.questionRepository.update(id, data);
    return this.getQuestion(question.id);
  }

  async deleteQuestion(id: number) {
    await this.questionRepository.delete(id);
    return { success: true };
  }

  private async savePartQuestion(partIds: number[], questionId: number) {
    await this.partQuestionRepository.delete({ questionId });
    await Promise.all(
      partIds.map(async (partId) => {
        await this.partQuestionRepository.save({
          partId,
          questionId,
        });
      }),
    );
  }
}
