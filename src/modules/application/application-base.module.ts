import { Module } from '@nestjs/common';
import { ApplicationRepository } from './repository/application.repository';
import { ApplicationBaseService } from './service/application-base.service';

@Module({
  providers: [ApplicationRepository, ApplicationBaseService],
  exports: [ApplicationBaseService],
})
export class ApplicationBaseModule {}
