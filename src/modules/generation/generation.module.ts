import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Generations } from 'src/infra/entity/Generations.entity';
import { GenerationController } from './controller/generation.controller';
import { GenerationRepository } from './repository/generation.repository';
import { GenerationService } from './service/generation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Generations])],
  controllers: [GenerationController],
  providers: [GenerationService, GenerationRepository],
  exports: [GenerationRepository],
})
export class GenerationModule {}
