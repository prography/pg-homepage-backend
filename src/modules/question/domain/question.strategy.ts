import { PartQuestionRepository } from '../repositories/parts-questions.repository';
import { QuestionRepository } from '../repositories/question.repository';
import { SelectOptionsRepository } from '../repositories/select-options.repository';

export interface QuestionStrategy {
  saveQuestion(
    questionRepository: QuestionRepository,
    partQuestionRepository: PartQuestionRepository,
    selectOptionsRepository: SelectOptionsRepository,
  ): Promise<number>;
}
