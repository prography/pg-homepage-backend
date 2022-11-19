import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './controller/user.controller';
import { UserAdminService, UserService } from './service';
import { UserBaseModule } from './user-base.module';

@Module({
  imports: [
    UserBaseModule,
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
  providers: [UserService, UserAdminService],
  exports: [],
})
export class UserModule {}
