import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './controller/user.controller';
import { UserRepository } from './repository/user.repository';
import { UserAdminService } from './service/user-admin.service';
import { UserService } from './service/user.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: +configService.get('JWT_EXPIRES_IN_SECONDS'),
        },
      }),
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, UserAdminService],
  exports: [],
})
export class UserModule {}
