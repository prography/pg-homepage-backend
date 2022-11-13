import { Module } from '@nestjs/common';
import { PartService } from './service/part.service';
import { PartController } from './controller/part.controller';
import { PartRepository } from './repository/part.repository';

@Module({
  controllers: [PartController],
  providers: [PartService, PartRepository],
})
export class PartModule {}
