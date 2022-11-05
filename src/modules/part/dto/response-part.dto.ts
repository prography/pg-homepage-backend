import { GenerationGetResponseDto } from '@modules/generation/dto/reponse-generation.dto';
import { ApiProperty } from '@nestjs/swagger';
import { PartNameDto } from './create-part.dto';

export class PartGetResponseDto extends PartNameDto {
  @ApiProperty({ description: '파트 고유 번호', example: '3' })
  id: number;

  generation: GenerationGetResponseDto;
}
