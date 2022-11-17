import { PartialType } from '@nestjs/swagger';
import { UserCreateDto } from './create-user.dto';

export class UserPutDto extends PartialType(UserCreateDto) {}
