import { HealthCheckModule } from '@core/health-check';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { GenerationModule } from './generation/generation.module';

@Module({
  imports: [HealthCheckModule, GenerationModule, AuthModule],
})
export class ApiModule {}
