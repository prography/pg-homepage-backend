import { GenerationGetResponseDto } from '@modules/generation/dto/reponse-generation.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';
import {
  SelectOptionCreateDto,
  QuestionCreateBaseDto,
} from './create-question.dto';

class PartGetResponseDto {}

export class SelectOptionGetDto extends SelectOptionCreateDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '옵션 id',
    example: 3,
    required: true,
  })
  optionId: number;
}
export class QuestionGetDto extends QuestionCreateBaseDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '질문 id',
    example: 3,
    required: true,
  })
  questionId: number;

  part: PartGetResponseDto;

  generation: GenerationGetResponseDto;
}
