import { AwsModule } from '@modules/aws/aws.module';
import { GenerationModule } from '@modules/generation/generation.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Portfolios } from 'src/infra/entity/Portpolios.entity';
import { PortfolioController } from './controller/portfolio.controller';
import { PortfolioRepository } from './repository/portfolio.repository';
import { PortfolioService } from './service/portfolio.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Portfolios]),
    GenerationModule,
    AwsModule,
  ],
  controllers: [PortfolioController],
  providers: [PortfolioService, PortfolioRepository],
})
export class PortfolioModule {}
