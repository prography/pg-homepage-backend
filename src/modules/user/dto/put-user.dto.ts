import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Users } from 'src/infra/entity/Users.entity';
import { UserCreateDto } from './create-user.dto';

export class UserPutDto extends PartialType(UserCreateDto) {}
export class UserChangedResultDto {
  @ApiProperty({ description: '변경된 row 갯수', example: '1' })
  affected: number;
}

export class UserAuthDto {
  @ApiProperty({ description: '사용자 정보' })
  user: Users;
  @ApiProperty({ description: '사용자 id로 관리되는 토큰' })
  token: string;
}
