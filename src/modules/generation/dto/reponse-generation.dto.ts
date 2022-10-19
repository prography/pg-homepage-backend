import { ApiProperty } from '@nestjs/swagger';
import { GenerationCreateDto } from './create-generation.dto';

export class GenerationGetResponseDto extends GenerationCreateDto {
  @ApiProperty({ description: '기수 고유 번호', example: '3' })
  id: number;
}

export class GenerationDeleteResponseDto {
  @ApiProperty({ description: '변동 사항', example: '' })
  raw: string;
  @ApiProperty({ description: '변경된 row 갯수', example: '1' })
  affected: number;
}
