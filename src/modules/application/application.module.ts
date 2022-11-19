import { Module } from '@nestjs/common';
import { ApplicationController } from './controller/application.controller';
import { ApplicationAdminService, ApplicationService } from './service';

@Module({
  controllers: [ApplicationController],
  providers: [ApplicationService, ApplicationAdminService],
})
export class ApplicationModule {}
