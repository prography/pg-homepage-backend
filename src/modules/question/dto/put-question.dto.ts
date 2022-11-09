import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import {
  QuestionCreateDto,
  SelectOptionCreateDto,
} from './create-question.dto';

export class SelectOptionPutDto extends SelectOptionCreateDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '옵션 id',
    example: 3,
    required: true,
  })
  optionId: number;
}
export class QuestionPutDto extends QuestionCreateDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '질문 id',
    example: 3,
    required: true,
  })
  questionId: number;
}
