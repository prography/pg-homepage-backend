import { Module } from '@nestjs/common';
import { PartService } from './service/part.service';
import { PartController } from './controller/part.controller';
import { PartRepository } from './repository/part.repository';
import { GenerationModule } from '@modules/generation/generation.module';

@Module({
  imports: [GenerationModule],
  controllers: [PartController],
  providers: [PartService, PartRepository],
})
export class PartModule {}
