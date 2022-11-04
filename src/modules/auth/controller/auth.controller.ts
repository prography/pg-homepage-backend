import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginRequestDto } from '../dto/login.dto';
import { AuthService } from '../service/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @ApiOperation({ summary: '로그인' })
  @Post()
  login(@Body() { password }: LoginRequestDto) {
    return this.authService.login(password);
  }
}
