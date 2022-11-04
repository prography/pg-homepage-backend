import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  login(password): LoginResponseDto {
    if (password !== this.configService.get('ADMIN_PASSWORD')) {
      throw new BadRequestException('로그인 실패');
    }
    return {
      token: this.jwtService.sign({ isAdmin: true }),
    };
  }
}
