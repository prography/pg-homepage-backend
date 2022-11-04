import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class SelectOptionCreateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '질문 옵션',
    example: '10시 30~11시30',
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
  readonly option_number: number;
}
export class QuestionCreateBaseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '왜 이 동아리에 지원했나요',
    description: '질문',
    required: true,
  })
  readonly text: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 3,
    description: '질문 번호',
    required: true,
  })
  readonly questionNumber: number;

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
