import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { JwtStrategy } from './jwt/strategy/jwt.strategy';
import { AuthService } from './service/auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
