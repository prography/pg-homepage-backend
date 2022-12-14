import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ApplicationCreateDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '파트 id',
  })
  partId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '사용자 id',
  })
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '기수 id',
  })
  generationId: number;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({
    description: '질문 답변 배열',
  })
  answers: AnswerCreateDto[];
}
export class AnswerCreateDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '질문 id',
  })
  questionId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '답변 내용',
  })
  answer: string;
}
