import { Questions } from 'src/infra/entity/Questions.entity';
import { CreateQuestionRequestDto } from '../dto/create-question.dto';

export function toEntity(
  createQuestionRequestDto: CreateQuestionRequestDto,
): Questions {
  const question = new Questions();
  question.type = createQuestionRequestDto.type;
  question.generationId = createQuestionRequestDto.generationId;
  question.text = createQuestionRequestDto.text;
  question.questionNumber = createQuestionRequestDto.questionNumber;
  question.required = createQuestionRequestDto.required;

  //part같은 객체가 직접 필요한 부분은 담지 않도록 했습니다
  return question;
}
