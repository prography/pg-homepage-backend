import { ApiModule } from '@modules/api.module';
import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Answers } from './infra/entity/Answers.entity';
import { Applications } from './infra/entity/Applications.entity';
import { Generations } from './infra/entity/Generations.entity';
import { Parts } from './infra/entity/Parts.entity';
import { Portfolios } from './infra/entity/Portpolios.entity';
import { Questions } from './infra/entity/Questions.entity';
import { SelectOptions } from './infra/entity/SelectOptions.entity';
import { Users } from './infra/entity/Users.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'development'
          ? ['.development.env', '.env']
          : ['.env', '.development.env'],
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        namingStrategy: new SnakeNamingStrategy(),
        entities: [
          Answers,
          Applications,
          Generations,
          Parts,
          Portfolios,
          Questions,
          SelectOptions,
          Users,
        ],
        synchronize: true,
        timezone: '+09:00',
      }),
    }),
    ApiModule,
    CacheModule.register({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
