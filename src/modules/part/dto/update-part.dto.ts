import { PartialType } from '@nestjs/swagger';
import { CreatePartRequestDto, CreatePartResponseDto } from './create-part.dto';

export class UpdatePartRequestDto extends PartialType(CreatePartRequestDto) {}

export class UpdatePartResponseDto extends CreatePartResponseDto {}
