import { CreateQuestionRequestDto } from '../dto/create-question.dto';
import { CheckBoxQuestion } from './checkBox-question.strategy';
import { ChoiceQuestion } from './choice-question.strategy';
import { LongQuestion } from './long-question.strategy';
import { QuestionStrategy } from './question.strategy';
import { ShortQuestion } from './short-question.strategy';

export function questionSaveStrategyFactory(
  createQuestionRequestDto: CreateQuestionRequestDto,
): QuestionStrategy {
  if (createQuestionRequestDto.type == 'CHECKBOX') {
    return new CheckBoxQuestion(createQuestionRequestDto);
  }
  if (createQuestionRequestDto.type == 'CHOICE') {
    return new ChoiceQuestion(createQuestionRequestDto);
  }
  if (createQuestionRequestDto.type == 'LONG') {
    return new LongQuestion(createQuestionRequestDto);
  }
  return new ShortQuestion(createQuestionRequestDto);
}
