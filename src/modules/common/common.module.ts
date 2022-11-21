import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { CommonService } from './common.service';

@Global()
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
  providers: [CommonService],
  exports: [JwtModule, CommonService],
})
export class CommonModule {}
