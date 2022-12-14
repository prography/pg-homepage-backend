import { GenerationModule } from '@modules/generation/generation.module';
import { PartBaseModule } from '@modules/part/part-base.module';
import { UserBaseModule } from '@modules/user/user-base.module';
import { Module } from '@nestjs/common';
import { ApplicationBaseModule } from './application-base.module';
import { ApplicationController } from './controller/application.controller';
import { ApplicationAdminService, ApplicationService } from './service';

@Module({
  imports: [
    GenerationModule,
    ApplicationBaseModule,
    UserBaseModule,
    PartBaseModule,
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService, ApplicationAdminService],
})
export class ApplicationModule {}
