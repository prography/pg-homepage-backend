import { HealthCheckModule } from '@core/health-check';
import { Module } from '@nestjs/common';
import { GenerationModule } from './generation/generation.module';

@Module({
  imports: [HealthCheckModule, GenerationModule],
})
export class ApiModule {}
