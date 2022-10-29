import { IsString } from 'class-validator';

export class LoginRequestDto {
  @IsString()
  password: string;
}

export class LoginResponseDto {
  token: string;
}
