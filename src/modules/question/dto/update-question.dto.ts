import { PartialType } from '@nestjs/swagger';
import { CreateQuestionRequestDto } from './create-question.dto';

export class UpdateQuestionRequestDto extends PartialType(
  CreateQuestionRequestDto,
) {}
