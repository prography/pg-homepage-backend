import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class GenerationCreateDto {
  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    example: '2022-01-01',
    description: '지원 시작일',
    required: true,
  })
  readonly applicationStart: Date;
  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    example: '2022-01-30',
    description: '지원 마감일',
    required: true,
  })
  readonly applicationEnd: Date;
  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    example: '2022-02-01',
    description: '활동 시작일',
    required: true,
  })
  readonly activityStart: Date;
  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    example: '2022-02-02',
    description: '활동 종료일',
    required: true,
  })
  readonly activityEnd: Date;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '7기', description: '기수명', required: true })
  readonly name: string;
}
