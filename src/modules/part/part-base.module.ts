import { Module } from '@nestjs/common';
import { PartRepository } from './repository/part.repository';
import { PartBaseService } from './service/part-base.service';

@Module({
  providers: [PartRepository, PartBaseService],
  exports: [PartBaseService],
})
export class PartBaseModule {}
