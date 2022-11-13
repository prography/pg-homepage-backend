import { PickType } from '@nestjs/swagger';
import { Parts } from 'src/infra/entity/Parts.entity';

export class CreatePartRequestDto extends PickType(Parts, [
  'name',
  'generationId',
] as const) {}

export class CreatePartResponseDto extends PickType(Parts, [
  'id',
  'name',
  'generationId',
] as const) {}
