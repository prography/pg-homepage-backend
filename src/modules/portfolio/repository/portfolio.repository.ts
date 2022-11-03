import { GenerationRepository } from '@modules/generation/repository/generation.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Portfolios } from 'src/infra/entity/Portpolios.entity';
import { Equal, Repository } from 'typeorm';

export type PortfolioRepositoryDto = {
  imageUrl: string;
  teamName: string;
  teamMembers: string;
  projectName: string;
  projectDescription: string;
  generationId: number;
};

@Injectable()
export class PortfolioRepository {
  constructor(
    @InjectRepository(Portfolios)
    private portfolioRepository: Repository<Portfolios>,
    private generationRepository: GenerationRepository,
  ) {}

  async findAll(): Promise<Portfolios[]> {
    return await this.portfolioRepository.find({
      select: {
        id: true,
        teamName: true,
        teamMembers: true,
        projectName: true,
        projectDescription: true,
        imageUrl: true,
        generation: {
          id: true,
          name: true,
        },
      },
      relations: ['generation'],
    });
  }

  async findById(portfolioId: number): Promise<Portfolios> {
    console.log(portfolioId);
    return await this.portfolioRepository.findOne({
      where: { id: Equal(portfolioId) },
      select: {
        id: true,
        teamName: true,
        teamMembers: true,
        projectName: true,
        projectDescription: true,
        imageUrl: true,
        generation: {
          id: true,
          name: true,
        },
      },
      relations: ['generation'],
    });
  }

  async createOrNull(
    portfolioData: PortfolioRepositoryDto,
  ): Promise<Portfolios> {
    const generationData = await this.generationRepository.findOneById(
      portfolioData.generationId,
    );
    if (!generationData) {
      return null;
    }
    console.log({
      generation: generationData,
      portfolioData,
    });
    return await this.portfolioRepository.save({
      generation: generationData,
      ...portfolioData,
    });
  }
}
