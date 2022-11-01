import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PartNameDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '파트 명',
    required: true,
  })
  readonly name: string;
}

export class PartCreateDto extends PartNameDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: '기수 고유 번호', example: '3', required: true })
  readonly generation: number;
}
