import { Module } from '@nestjs/common';
import { ApplicationController } from './controller/application.controller';
import { ApplicationRepository } from './repository/application.repository';
import { ApplicationAdminService, ApplicationService } from './service';

@Module({
  controllers: [ApplicationController],
  providers: [
    ApplicationRepository,
    ApplicationService,
    ApplicationAdminService,
  ],
})
export class ApplicationModule {}
