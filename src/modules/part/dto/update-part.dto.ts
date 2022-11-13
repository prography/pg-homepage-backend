import { PartialType } from '@nestjs/swagger';
import { CreatePartRequestDto } from './create-part.dto';

export class UpdatePartRequestDto extends PartialType(CreatePartRequestDto) {}
