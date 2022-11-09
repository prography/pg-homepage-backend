import { ApiProperty } from '@nestjs/swagger';
import { UserCreateDto } from './create-user.dto';

export class UserGetDto extends UserCreateDto {
  @ApiProperty({
    description: '사용자 id',
  })
  userId: number;

  @ApiProperty({
    description: '지원서 id',
  })
  applicationId: number;
}
