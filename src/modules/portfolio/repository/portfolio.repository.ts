import { GenerationRepository } from '@modules/generation/repository/generation.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Portfolios } from 'src/infra/entity/Portpolios.entity';
import { DeleteResult, Equal, Repository } from 'typeorm';

export type PortfolioRepositoryDto = {
  imageUrl: string;
  teamName: string;
  teamMembers: string;
  projectName: string;
  frameworks: string;
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
        frameworks: true,
        generation: {
          id: true,
          name: true,
        },
      },
      relations: ['generation'],
    });
  }

  async findOneById(portfolioId: number): Promise<Portfolios> {
    return await this.portfolioRepository.findOne({
      where: { id: Equal(portfolioId) },
      select: {
        id: true,
        teamName: true,
        teamMembers: true,
        projectName: true,
        projectDescription: true,
        imageUrl: true,
        frameworks: true,
        generation: {
          id: true,
          name: true,
        },
      },
      relations: ['generation'],
    });
  }

  async create(portfolioData: PortfolioRepositoryDto): Promise<Portfolios> {
    const generationResult = await this.generationRepository.findOneById(
      portfolioData.generationId,
    );
    if (!generationResult) {
      return null;
    }
    return await this.portfolioRepository.save({
      generation: generationResult,
      ...portfolioData,
    });
  }

  async updateOneById(
    id: number,
    portfolioData: PortfolioRepositoryDto,
  ): Promise<Portfolios> {
    const generationResult = await this.generationRepository.findOneById(
      portfolioData.generationId,
    );
    if (!generationResult) {
      return null;
    }
    return await this.portfolioRepository.save({ id, ...portfolioData });
  }

  async deleteOneById(portfolioId: number): Promise<DeleteResult> {
    return await this.portfolioRepository.delete({ id: portfolioId });
  }
}
