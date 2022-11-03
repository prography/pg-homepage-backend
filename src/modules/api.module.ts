import { HealthCheckModule } from '@core/health-check';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AwsModule } from './aws/aws.module';
import { GenerationModule } from './generation/generation.module';
import { PortfolioModule } from './portfolio/portfolio.module';

@Module({
  imports: [
    HealthCheckModule,
    GenerationModule,
    AuthModule,
    PortfolioModule,
    AwsModule,
  ],
})
export class ApiModule {}
