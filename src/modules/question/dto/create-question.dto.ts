import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Questions } from 'src/infra/entity/Questions.entity';

export class CreateSelectOptionRequestDto {
  @IsString()
  @ApiProperty({
    description: '객관식 문항의 보기 내용',
  })
  value: string;

  @IsNumber()
  @ApiProperty({
    description: '객관식 문항의 보기 번호',
  })
  optionNumber: number;
}
export class CreateQuestionRequestDto extends PickType(Questions, [
  'type',
  'text',
  'questionNumber',
  'generationId',
] as const) {
  @IsNumber({}, { each: true })
  partIds: number[];

  @ApiProperty({ description: '객관식 문항의 보기' })
  selectOptions: CreateSelectOptionRequestDto[];
}
