import { HealthCheckModule } from '@core/health-check';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { GenerationModule } from './generation/generation.module';
import { PartModule } from './part/part.module';
import { QuestionModule } from './question/question.module';
import { UserModule } from './user/user.module';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [
    HealthCheckModule,
    GenerationModule,
    AuthModule,
    PartModule,
    QuestionModule,
    UserModule,
    ApplicationModule,
  ],
})
export class ApiModule {}
