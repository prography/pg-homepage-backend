import { GenerationModule } from '@modules/generation/generation.module';
import { Module } from '@nestjs/common';
import { ApplicationBaseModule } from './application-base.module';
import { ApplicationController } from './controller/application.controller';
import { ApplicationAdminService, ApplicationService } from './service';

@Module({
  imports: [GenerationModule, ApplicationBaseModule],
  controllers: [ApplicationController],
  providers: [ApplicationService, ApplicationAdminService],
})
export class ApplicationModule {}
