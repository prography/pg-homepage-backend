import { PickType } from '@nestjs/swagger';
import { Users } from 'src/infra/entity/Users.entity';

export class UserCreateDto extends PickType(Users, [
  'name',
  'phoneNumber',
  'email',
] as const) {}
