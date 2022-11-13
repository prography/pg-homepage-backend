import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { Questions } from 'src/infra/entity/Questions.entity';

export class SelectOptionCreateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '객관식 문항의 보기',
    example: '11시 00분 면접 가능',
    required: true,
  })
  readonly value: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '객관식 답변 번호',
    example: 1,
    required: true,
  })
  readonly optionNumber: number;
}
export class QuestionCreateBaseDto {
  @Matches(/^(shortAnswer)|(^essay&)&/)
  @IsString()
  @ApiProperty({
    enum: ['choice', 'essay'],
    description: '질문 형식 결정 기본은 essay 주관식 choice 객관식',
  })
  readonly type?: 'essay' | 'shortAnswer';

  @IsOptional()
  @ApiProperty({
    description: '객관식 질문일 경우 선택지를 배열로 관리',
  })
  readonly options?: SelectOptionCreateDto[];
}
export class QuestionCreateDto extends QuestionCreateBaseDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 3,
    description: '파트 id',
    required: true,
  })
  readonly partId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 3,
    description: '기수 id',
    required: true,
  })
  readonly generationId: number;
}

export class CreateQuestionRequestDto extends PickType(Questions, [
  'type',
  'text',
  'questionNumber',
  'generationId',
] as const) {
  @IsNumber({}, { each: true })
  partIds: number[];
}
