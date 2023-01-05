import { Module } from '@nestjs/common';
import { AnswersRepository } from './repository/answer.repository';
import { ApplicationRepository } from './repository/application.repository';
import { ApplicationBaseService } from './service/application-base.service';

@Module({
  providers: [ApplicationRepository, AnswersRepository, ApplicationBaseService],
  exports: [ApplicationBaseService],
})
export class ApplicationBaseModule {}
