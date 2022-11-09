import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserCreateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'email',
    required: true,
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '전화번호',
    required: true,
  })
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '이름',
    required: true,
  })
  name: string;
}
